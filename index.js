/** 
 * Functions for Quiz which will have score,questions and questionIndex.
 * Each Question will have its questionText, options, correct answer
 */
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

function Question(text, options, answer) {
    this.questionText = text;
    this.options = options;
    this.answer = answer;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (ans) {
    if (this.getQuestionByIndex().answer == ans) {
        this.score++;
    }
    this.questionIndex++;

}
Quiz.prototype.isEnded = function () {
    return this.questionIndex == this.questions.length;
}
/* Five Questions, Options and Answers */

let questions = [
    new Question('What does HTML stand for?', ["Hyper Text Markup Language", "High Tech Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], 'Hyper Text Markup Language'),
    new Question('Which of the following is NOT a programming language?', ['Python', 'Adobe Photoshop', 'Java', 'C++'], 'Adobe Photoshop'),
    new Question('What does CSS stand for?', ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], 'Cascading Style Sheets'),
    new Question('Which programming language is primarily used for web development?', ['Java', 'Swift', 'JavaScript', 'C#'], 'JavaScript'),
    new Question('Which of the following data types is used to store a sequence of characters in Python?', ['int', 'float', 'str', 'bool'], 'str')
];

let quiz = new Quiz(questions);

/* Load Questions on HTML */

function displayQuestions() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionByIndex().questionText;
        let choices = quiz.getQuestionByIndex().options;
        for (let i = 0; i < choices.length; i++) {
            var elem = document.getElementById("choice" + i);
            elem.innerText = choices[i];
            handleClickOnButton("btn" + i, choices[i]);
        }

    }


}
/**based on clicking the choice verifying answer, updating the score accordingly
 * update the question index
 * check quiz is ended, if not go to next question
 * show the result
 */
function handleClickOnButton(id, choice) {
    let buttonElement = document.getElementById(id)
    buttonElement.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        displayQuestions();
    }


    /**
     * showing the progress of questions as we navigating through the questions
     */
    showProgres();

}
displayQuestions();

function showProgres() {
    let currentIndex = quiz.questionIndex + 1;
    let questionProgressElement = document.getElementById("progress");
    questionProgressElement.innerText = `Question ${currentIndex} of ${quiz.questions.length}`;
}

/**
 * Calculating the score and percentage
 * navigating to the result page after last question 
 * resultpage consists of score and percentage
 */

function showScores() {
    let result = `<h1>RESULT</h1><h2 id="score">Your Score ${quiz.score}.<br><br>Marks Percetage is ${(quiz.score / questions.length) * 100}%</h2>`;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = result;

}