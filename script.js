let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let totalTime = 600; // 10 phút = 600 giây

async function loadQuestions() {
    const response = await fetch('questions.json');
    questions = await response.json();

    // Lấy đúng 30 câu đầu
    questions = questions.slice(0, 30);

    startTimer();
    showQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        totalTime--;
        document.getElementById("timer").innerText = formatTime(totalTime);

        if (totalTime <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById("question").innerText = `Câu ${currentQuestionIndex + 1}: ${q.question}`;

    document.getElementById("answerA").innerText = q.optionA;
    document.getElementById("answerB").innerText = q.optionB;
    document.getElementById("answerC").innerText = q.optionC;
    document.getElementById("answerD").innerText = q.optionD;
}

function selectAnswer(option) {
    const correct = questions[currentQuestionIndex].answer.trim().toUpperCase();
    if (option === correct) score++;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById("score").innerText =
        `Kết quả: ${score}/${questions.length} câu (${Math.round(score/questions.length*100)}%)`;
}

loadQuestions();

