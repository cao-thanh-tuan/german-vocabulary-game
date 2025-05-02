let correctScore = 0;
let incorrectScore = 0;
let vocabulary = [];
let learnMoreVocabulary = [];

async function GetVocabularyFromAI() {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer sk-xxxxxxxxxxxxxxxxxxxx`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: "Generate a list of 25 German vocabulary words with their articles and meanings at A1, A2 level." }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const vocabularyList = data.choices[0].text.trim().split("\n").map(line => {
            const [article, word, meaning] = line.split(" - ");
            return { word: word.trim(), article: article.trim(), meaning: meaning.trim() };
        });

        return vocabularyList;
    } catch (error) {
        console.error("Error fetching vocabulary from AI API:", error);
        return [];
    }
}

function updateScore() {
    $("#correct-score").text(correctScore);
    $("#incorrect-score").text(incorrectScore);
}

function checkCompletion() {
    if (correctScore === vocabulary.length) {
        const percentage = ((correctScore - incorrectScore) / vocabulary.length) * 100;
        alert(`Spiel beendet! Deine Punktzahl: ${percentage}%`);
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.originalEvent.dataTransfer.setData("text", $(event.target).text());
}

function drop(event, article, column) {
    event.preventDefault();
    if (!event.originalEvent) return;
        
    const word = event.originalEvent.dataTransfer.getData("text");
    const wordObj = vocabulary.find(item => item.word === word);
    let playwordNumber = 1;

    if (wordObj.article === article) {
        // find ul element in the column
        const $ul = $(column).find("ul");
        
        // Append the word to the correct $ul in the column
        let $li = $("<li>")
            .text(word)
            .addClass("corrected-vocabulary-item");

        if (learnMoreVocabulary.includes(word)) {
            $li.addClass("learn-more-vocabulary-item");
            playwordNumber += 1;
        }

        $ul.append($li);

        // Remove the word from the vocabulary list
        $("#vocabulary-list li").filter((_, el) => $(el).text() === word).remove();

        correctScore++;

        // Play the word asynchronously
        setTimeout(() => {
            playWord(wordObj, playwordNumber);
        }, 0);
    } else {
        incorrectScore++;
        learnMoreVocabulary.push(word);
    }

    updateScore();

    // Delay the checkCompletion call to ensure the UI is updated
    setTimeout(() => {
        checkCompletion();
    }, 0);
}

function playWord(wordObj, numberOfTimes = 1) {
    // Check if the word object is valid
    if (!wordObj || !wordObj.word) {
        console.error("Invalid word object");
        return;
    }

    // Combine word and article from the word object into a string
    const word = `${wordObj.article} ${wordObj.word}`;

    const voices = speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.name.includes('Google') && v.lang === 'de-DE') ||
                        voices.find(v => v.name.includes('Hedda') && v.lang === 'de-DE') ||
                        voices.find(v => v.name === 'Anna' && v.lang === 'de-DE') ||
                        voices.find(v => v.lang === 'de-DE');

    // Function to play the word a specific number of times
    const playAudio = (count) => {
        if (count <= 0) return; // Stop when repetitions are complete

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'de'; // German language
        utterance.voice = germanVoice;

        // Play the word and schedule the next repetition
        utterance.onend = () => {
            setTimeout(() => {
                playAudio(count - 1); // Decrement the count and play again
            }, 1200); // 1.5-second delay between repetitions
        };

        speechSynthesis.speak(utterance);
    };

    // Start playing the word
    playAudio(numberOfTimes);
}

function createVocabularyList() {
    vocabulary.forEach(item => {
        const $li = $("<li>")
            .text(item.word)
            .addClass("vocabulary-item")
            .attr("draggable", true)
            .attr("title", item.meaning)
            .on("dragstart", drag);
        $("#vocabulary-list").append($li);
    });
}

(async () => {
    //Call an AI Api to gernerate another list of vocabulary and then build a AILearningVocabulary array
    const AILearningVocabulary = [];//await GetVocabularyFromAI();

    // check if AILearningVocabulary is not empty
    if (AILearningVocabulary && AILearningVocabulary.length > 0) {
        // assign the AILearningVocabulary to the vocabulary array
        vocabulary = vocabulary.concat(AILearningVocabulary);
    } else {
        // randomly and pickup 25 vocabularies from vacabulary array into anoter array
        while (vocabulary.length < 25) {
            const randomIndex = Math.floor(Math.random() * LearningVocabulary.length);
            const randomWord = LearningVocabulary[randomIndex];
            if (!vocabulary.includes(randomWord)) {
                vocabulary.push(randomWord);
            }
        }
    }

    // shuffle the vocabulary array
    vocabulary = vocabulary.sort(() => Math.random() - 0.5);

    $(document).ready(() => {
        createVocabularyList();
        updateScore();

        // Set up drop zones
        $("#der-column").on("dragover", allowDrop).on("drop", function (event) {
            drop(event, "der", this);
        });
        $("#die-column").on("dragover", allowDrop).on("drop", function (event) {
            drop(event, "die", this);
        });
        $("#das-column").on("dragover", allowDrop).on("drop", function (event) {
            drop(event, "das", this);
        });
    });
})();
