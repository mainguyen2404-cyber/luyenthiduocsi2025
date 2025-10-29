fetch('questions.json')
.then(r => r.json())
.then(data => {
  const quiz=document.getElementById('quiz');
  data.forEach((q,i)=>{
    let div=document.createElement('div');
    div.className='question';
    div.innerHTML=`
      <p><b>Câu ${i+1}:</b> ${q.question}</p>
      ${['A','B','C','D'].map(opt=>`
        <label><input type="radio" name="q${i}" value="${opt}"> ${opt}: ${q[opt]}</label><br>
      `).join('')}
    `;
    quiz.appendChild(div);
  });

  document.getElementById('submit').onclick=()=>{
    let score=0;
    data.forEach((q,i)=>{
      let ans=document.querySelector(`input[name="q${i}"]:checked`);
      if(ans && ans.value==q.answer) score++;
    });
    document.getElementById('result').innerHTML=`Kết quả: ${score}/${data.length}`;
  };
});
