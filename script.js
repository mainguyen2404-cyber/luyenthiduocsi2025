let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 600; // 10 phút

async function loadQuestions() {
    const res = await fetch("questions.json");
    questions = await res.json();

    // Giới hạn 30 câu
    questions = questions.slice(0, 30);

    showQuestion();
    startTimer();
}

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = `Câu ${currentQuestion + 1}: ${q.question}`;

    document.getElementById("answerA").innerText = q.optionA;
    document.getElementById("answerB").innerText = q.optionB;
    document.getElementById("answerC").innerText = q.optionC;
    document.getElementById("answerD").innerText = q.optionD;
}

function chooseAnswer(choice) {
    const correct = questions[currentQuestion].answer.trim().toUpperCase();
    if (choice === correct) score++;

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText =
        `Bạn đúng ${score}/${questions.length} câu (${Math.round(score/questions.length * 100)}%)`;
}

loadQuestions();

