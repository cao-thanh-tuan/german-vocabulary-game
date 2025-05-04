let vocabularyNumberInEachGame = 25;
let correctScore = 0;
let incorrectScore = 0;
let vocabulary = [];
let learnMoreVocabulary = [];

function updateScore() {
    $("#correct-score").text(correctScore);
    $("#incorrect-score").text(incorrectScore);
}

function checkCompletion() {
    if (correctScore === vocabulary.length) {
        const percentage = ((correctScore - incorrectScore) / vocabulary.length) * 100;
        alert(`Spiel beendet! Deine Punktzahl: ${percentage}%`);

        // Load stored challenging words
        const storedChallengingWords = JSON.parse(localStorage.getItem("challengingWords") || "[]");

        // remove words in vocabulary from storedChallengingWords
        const filteredChallengingWords = storedChallengingWords.filter(word => !vocabulary.some(item => item.word === word));

        // Merge current learnMoreVocabulary with storedChallengingWords
        const updatedChallengingWords = [...new Set([...filteredChallengingWords, ...learnMoreVocabulary])];

        // Save updated challenging words to localStorage
        localStorage.setItem("challengingWords", JSON.stringify(updatedChallengingWords));
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

    if (wordObj.article === article) {
        const $ul = $(column).find("ul");

        let $li = $("<li>")
            .text(word)
            .addClass("corrected-vocabulary-item")
            .on("click", function (event) {
                showTooltip(this, wordObj.meaning);
                playWord(wordObj);
            });

        if (learnMoreVocabulary.includes(word)) {
            $li.addClass("learn-more-vocabulary-item");
        }

        $ul.append($li);

        // Remove the word from the vocabulary list
        $("#vocabulary-list li").filter((_, el) => $(el).text() === word).remove();

        correctScore++;

        // Play the word asynchronously
        setTimeout(() => {
            playWord(wordObj);
        }, 0);
    } else {
        incorrectScore++;
        if (!learnMoreVocabulary.includes(word)) {
            learnMoreVocabulary.push(word);
        }
    }

    updateScore();

    setTimeout(() => {
        checkCompletion();
    }, 0);
}

function showTooltip(item, text) {
    // Remove any existing tooltip
    $(".tooltip").remove();

    // Create a tooltip element
    const $tooltip = $("<div>")
        .addClass("tooltip")
        .text(text);

    // Append the tooltip to the body
    $("body").append($tooltip);

    // Position the tooltip near the clicked item
    const offset = $(item).offset();
    $tooltip.css({
        top: offset.top - $tooltip.outerHeight() - 10 + "px",
        left: offset.left + "px"
    });

    // Remove the tooltip after a short delay
    setTimeout(() => $tooltip.fadeOut(300, () => $tooltip.remove()), 1000);
}

function playWord(wordObj) {
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

    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de'; // German language
    utterance.voice = germanVoice;

    // Play the word
    speechSynthesis.speak(utterance);
}

function createVocabularyList() {
    vocabulary.forEach(item => {
        const $li = $("<li>")
            .text(item.word)
            .addClass("vocabulary-item")
            .attr("draggable", true)
            .on("dragstart", drag)
            .on("click", function (event) {
                showTooltip(this, item.meaning);
            });
        $("#vocabulary-list").append($li);
    });
}

function loadChallengingWords() {
    const storedChallengingWords = JSON.parse(localStorage.getItem("challengingWords") || "[]");
    storedChallengingWords.forEach(word => {
        const wordObj = LearningVocabulary.find(item => item.word === word);
        if (wordObj && !vocabulary.includes(wordObj)) {
            vocabulary.push(wordObj);
        }
    });
}

(async () => {
    // Load challenging words from localStorage
    loadChallengingWords();

    // randomly and pickup vocabularyNumberInEachGame vocabulary from vacabulary array into anoter array
    while (vocabulary.length < vocabularyNumberInEachGame) {
        const randomIndex = Math.floor(Math.random() * LearningVocabulary.length);
        const randomWord = LearningVocabulary[randomIndex];
        if (!vocabulary.includes(randomWord)) {
            vocabulary.push(randomWord);
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
