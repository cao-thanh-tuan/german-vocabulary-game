# German Vocabulary Game

## Overview
The German Vocabulary Game is an interactive web application designed to help users learn German vocabulary by categorizing nouns based on their articles: "der" (masculine), "die" (feminine), and "das" (neuter). The game features a drag-and-drop interface that allows users to practice their understanding of German articles in a fun and engaging way.

## Project Structure
The project consists of the following files:

- **src/index.html**: Contains the HTML structure of the game, including the three colored columns for "der," "die," and "das," the vocabulary list, and the score display.
- **src/styles/style.css**: Contains the CSS styles for the game, defining the layout, colors for the columns, and styles for the vocabulary list and score display.
- **src/scripts/app.js**: Contains the JavaScript logic for the game, including vocabulary loading, drag-and-drop functionality, score tracking, and the completion logic that calculates and displays the percentage of correct answers.
- **src/vocabulary.txt**: Contains a list of German vocabulary words with their articles.

## How to Run the Game
1. Clone the repository to your local machine.
2. Open the `src/index.html` file in a web browser.
3. Drag and drop the vocabulary words into the corresponding columns based on their articles.
4. Keep track of your score displayed in the top right corner.
5. Once all words are correctly placed, the game will display your percentage of correct answers.

## Features
- **Interactive Drag-and-Drop**: Drag and drop vocabulary words into the correct columns based on their articles.
- **Real-Time Score Tracking**: Displays the number of correct and incorrect placements in the top right corner.
- **Tooltips for Vocabulary**: Hovering over a vocabulary item shows its meaning in a tooltip.
- **Dynamic Vocabulary Loading**: Vocabulary is loaded dynamically from a predefined list or fetched from an AI API.
- **Completion Feedback**: Displays a completion message with the percentage of correct answers once all words are placed.
- **Responsive Design**: Vocabulary items are displayed in rows and wrap to the next row when the row is full.

## Technologies Used
- HTML
- CSS
- JavaScript
- jQuery

## Recent Updates
- **Tooltips Added**: Vocabulary items now display their meanings in a tooltip when hovered over.
- **Dynamic Vocabulary Loading**: Vocabulary is either fetched from an AI API or randomly selected from a predefined list.
- **Improved Styling**: Moved inline styles to the `style.css` file for better maintainability.
- **Responsive Layout**: Vocabulary items are displayed in rows and wrap to the next row when the row is full.

## How to Contribute
Feel free to contribute to the project by submitting issues or pull requests. Your feedback and suggestions are welcome!

## License
This project is open-source and available under the MIT License.