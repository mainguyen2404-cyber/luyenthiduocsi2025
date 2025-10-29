fetch('questions.json')
.then(res => res.json())
.then(data => {

  // Lấy ngẫu nhiên 30 câu từ ngân hàng
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const LIMIT = 30;
  const questions = shuffle(data).slice(0, LIMIT);

  // Đếm ngược 10 phút (600 giây)
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

  // Hiển thị câu hỏi
  const quiz = document.getElementById("quiz");
  questions.forEach((q, i) => {
    quiz.innerHTML += `
      <div class="question">
        <p><b>Câu ${i+1}:</b> ${q.question}</p>
        <label><input type="radio" name="q${i}" value="A"> A: ${q.A}</label><br>
        <label><input type="radio" name="q${i}" value="B"> B: ${q.B}</label><br>
        <label><input type="radio" name="q${i}" value="C"> C: ${q.C}</label><br>
        <label><input type="radio" name="q${i}" value="D"> D: ${q.D}</label><br>
      </div>
    `;
  });

  // Tính điểm
  document.getElementById("submit").onclick = submitQuiz;

  function submitQuiz() {
    clearInterval(timer); // dừng đồng hồ
    let score = 0;

    questions.forEach((q, i) => {
      let selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value == q.answer) {
        score++;
      }
    });

    document.getElementById("result").innerHTML = `✅ Kết quả: <span style="color:blue">${score}/${questions.length}</span>`;
  }

});

