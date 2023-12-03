// Select various DOM elements needed for the game
const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

// Variables to store the correct word and the timer
let correctWord, timer;

// Function to initialize and start the timer
const initTimer = maxTime => {
    // Clear any existing timers
    clearInterval(timer);

    // Set up a new timer that decrements every second
    timer = setInterval(() => {
        // Check if there is still time left
        if (maxTime > 0) {
            // Decrement the time and update the display
            maxTime--;
            return timeText.textContent = maxTime;
        }

        // If time is up, show an alert with the correct word and restart the game
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

// Function to initialize the game
const initGame = () => {
    // Start the timer with a maximum time of 30 seconds
    initTimer(30);

    // Get a random word object from the 'words' array
    let randomObj = words[Math.floor(Math.random() * words.length)];

    // Shuffle the characters of the word for display
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    // Update the displayed word and hint
    wordText.textContent = wordArray.join("");
    hintText.textContent = randomObj.hint;

    // Store the correct word in lowercase for checking later
    correctWord = randomObj.word.toLowerCase();

    // Reset the input field and set its maximum length
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

// Function to check the entered word against the correct word
const checkWord = () => {
    // Get the user-entered word in lowercase
    let userWord = inputField.value.toLowerCase();

    // Check if the user entered a word
    if (!userWord) return alert("Please enter the word to check!");

    // Check if the entered word is correct
    if (userWord !== correctWord) return alert(`Nop! ${userWord} is not a correct word`);

    // If the word is correct, show a congratulatory alert and restart the game
    alert(`Bravo! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
}

// Event listeners for the refresh and check buttons
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Initialize the game when the script is first loaded
initGame();
