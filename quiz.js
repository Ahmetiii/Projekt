const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        answer: "Harper Lee"
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();

    document.getElementById('next-button').addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === quizData[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion();
            } else {
                showResults();
            }
        } else {
            alert('Please select an option!');
        }
    });

    document.getElementById('restart-button').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('results-container').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        showQuestion();
    });
});

function showQuestion() {
    const questionData = quizData[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
    questionData.options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = `
            <label>
                <input type="radio" name="option" value="${option}">
                ${option}
            </label>
        `;
        optionsList.appendChild(li);
    });
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `You scored ${score} out of ${quizData.length}`;
    document.getElementById('results-container').classList.remove('hidden');
}
