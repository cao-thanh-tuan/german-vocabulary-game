const LearningVocabulary = [
    { word: "Mann", article: "der", meaning: "man" },
    { word: "Vater", article: "der", meaning: "father" },
    { word: "Freund", article: "der", meaning: "friend" },
    { word: "Junge", article: "der", meaning: "boy" },
    { word: "Lehrer", article: "der", meaning: "teacher" },
    { word: "Arzt", article: "der", meaning: "doctor" },
    { word: "Name", article: "der", meaning: "name" },
    { word: "Tisch", article: "der", meaning: "table" },
    { word: "Stuhl", article: "der", meaning: "chair" },
    { word: "Hund", article: "der", meaning: "dog" },
    { word: "Tag", article: "der", meaning: "day" },
    { word: "Monat", article: "der", meaning: "month" },
    { word: "Bus", article: "der", meaning: "bus" },
    { word: "Zug", article: "der", meaning: "train" },
    { word: "Bahnhof", article: "der", meaning: "train station" },
    { word: "Apfel", article: "der", meaning: "apple" },
    { word: "Kaffee", article: "der", meaning: "coffee" },
    { word: "Tee", article: "der", meaning: "tea" },
    { word: "Kuchen", article: "der", meaning: "cake" },
    { word: "Film", article: "der", meaning: "movie" },
    { word: "Computer", article: "der", meaning: "computer" },
    { word: "Brief", article: "der", meaning: "letter" },
    { word: "Beruf", article: "der", meaning: "profession" },
    { word: "Kollege", article: "der", meaning: "colleague" },
    { word: "Schüler", article: "der", meaning: "student" },
    { word: "Schlüssel", article: "der", meaning: "key" },
    { word: "Schuh", article: "der", meaning: "shoe" },
    { word: "Fisch", article: "der", meaning: "fish" },
    { word: "Markt", article: "der", meaning: "market" },
    { word: "Onkel", article: "der", meaning: "uncle" },
    { word: "Frau", article: "die", meaning: "woman" },
    { word: "Mutter", article: "die", meaning: "mother" },
    { word: "Freundin", article: "die", meaning: "female friend" },
    { word: "Lehrerin", article: "die", meaning: "female teacher" },
    { word: "Ärztin", article: "die", meaning: "female doctor" },
    { word: "Familie", article: "die", meaning: "family" },
    { word: "Schule", article: "die", meaning: "school" },
    { word: "Straße", article: "die", meaning: "street" },
    { word: "Lampe", article: "die", meaning: "lamp" },
    { word: "Zeitung", article: "die", meaning: "newspaper" },
    { word: "Tasche", article: "die", meaning: "bag" },
    { word: "Uhr", article: "die", meaning: "clock" },
    { word: "Tür", article: "die", meaning: "door" },
    { word: "Wohnung", article: "die", meaning: "apartment" },
    { word: "Küche", article: "die", meaning: "kitchen" },
    { word: "Banane", article: "die", meaning: "banana" },
    { word: "Tomate", article: "die", meaning: "tomato" },
    { word: "Butter", article: "die", meaning: "butter" },
    { word: "Milch", article: "die", meaning: "milk" },
    { word: "Sprache", article: "die", meaning: "language" },
    { word: "Arbeit", article: "die", meaning: "work" },
    { word: "Stadt", article: "die", meaning: "city" },
    { word: "Frage", article: "die", meaning: "question" },
    { word: "Antwort", article: "die", meaning: "answer" },
    { word: "Nummer", article: "die", meaning: "number" },
    { word: "Musik", article: "die", meaning: "music" },
    { word: "Polizei", article: "die", meaning: "police" },
    { word: "Blume", article: "die", meaning: "flower" },
    { word: "Jacke", article: "die", meaning: "jacket" },
    { word: "Schwester", article: "die", meaning: "sister" },
    { word: "Kind", article: "das", meaning: "child" },
    { word: "Haus", article: "das", meaning: "house" },
    { word: "Auto", article: "das", meaning: "car" },
    { word: "Buch", article: "das", meaning: "book" },
    { word: "Heft", article: "das", meaning: "notebook" },
    { word: "Bild", article: "das", meaning: "picture" },
    { word: "Zimmer", article: "das", meaning: "room" },
    { word: "Fenster", article: "das", meaning: "window" },
    { word: "Essen", article: "das", meaning: "food" },
    { word: "Brot", article: "das", meaning: "bread" },
    { word: "Ei", article: "das", meaning: "egg" },
    { word: "Wasser", article: "das", meaning: "water" },
    { word: "Bier", article: "das", meaning: "beer" },
    { word: "Telefon", article: "das", meaning: "telephone" },
    { word: "Handy", article: "das", meaning: "mobile phone" },
    { word: "Radio", article: "das", meaning: "radio" },
    { word: "Lied", article: "das", meaning: "song" },
    { word: "Jahr", article: "das", meaning: "year" },
    { word: "Problem", article: "das", meaning: "problem" },
    { word: "Geschenk", article: "das", meaning: "gift" },
    { word: "Hobby", article: "das", meaning: "hobby" },
    { word: "Frühstück", article: "das", meaning: "breakfast" },
    { word: "Gemüse", article: "das", meaning: "vegetable" },
    { word: "Fleisch", article: "das", meaning: "meat" },
    { word: "Tier", article: "das", meaning: "animal" },
    { word: "Bett", article: "das", meaning: "bed" },
    { word: "Spiel", article: "das", meaning: "game" },
    { word: "Kino", article: "das", meaning: "cinema" },
    { word: "Baby", article: "das", meaning: "baby" },
    { word: "Internet", article: "das", meaning: "internet" },
    { word: "Entwickler", article: "der", meaning: "developer" },
];

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
    const language = 'de';

    // Google Translate TTS URL (unofficial)
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=${language}&client=tw-ob`;

    // Play the audio numberOfTimes asynchronously with a 1-second delay between each play
    const playAudio = async () => {
        for (let i = 0; i < numberOfTimes; i++) {
            const audio = new Audio(url); // Create a new Audio instance for each play
            try {
                await audio.play();
                // Delay 1.5 seconds before the next play
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
                console.error("Audio playback failed:", error);
            }
        }
    };

    // Ensure the function is called after a user interaction
    playAudio();
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
