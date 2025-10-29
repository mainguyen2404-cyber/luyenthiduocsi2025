fetch('questions.json')
.then(res => res.json())
.then(data => {

  // Hàm trộn ngẫu nhiên
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  const LIMIT = 30; // hiển thị 30 câu
  const questions = shuffle(data).slice(0, LIMIT);

  // Đồng hồ đếm ngược 10 phút
  let timeLeft = 600;
  let timer = setInterval(() => {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    s = s < 10 ? "0" + s : s;
    document.getElementById("timer").innerText = `${m}:${s}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
      alert("⏰ Hết giờ! Bài thi đã được nộp.");
    }
    timeLeft--;
  }, 1000);

  // Hiển thị câu hỏi + trộn đáp án
  const quiz = document.getElementById("quiz");
  questions.forEach((q, i) => {
    
    // Gom đáp án vào mảng
    let options = [
      { key: "A", text: q.A },
      { key: "B", text: q.B },
      { key: "C", text: q.C },
      { key: "D", text: q.D }
    ];

    // Trộn đáp án
    options = shuffle(options);

    // Xác định đáp án đúng sau khi trộn
    let correctOption = options.find(op => op.key === q.answer).key;

    // Lưu lại đáp án đúng mới vào câu hỏi
    q.correct = correctOption;

    quiz.innerHTML += `
      <div class="question">
        <p><b>Câu ${i+1}:</b> ${q.question}</p>
        ${options.map(op => `
          <label><input type="radio" name="q${i}" value="${op.key}"> ${op.key}: ${op.text}</label><br>
        `).join('')}
      </div>
    `;
  });

  // Nút nộp bài
  document.getElementById("submit").onclick = submitQuiz;

  function submitQuiz() {
    clearInterval(timer);
    let score = 0;

    questions.forEach((q, i) => {
      let selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value == q.correct) {
        score++;
      }
    });

    document.getElementById("result").innerHTML =
      `✅ Kết quả: <span style="color:blue">${score}/${questions.length}</span>`;
  }

});

