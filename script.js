let startBtn = document.querySelector(".start_btn");
let exitBtn = document.querySelector(".exit_btn");
let nextQuestionBtn = document.querySelector(".next_question");
let continueBtn = document.querySelector(".continue_btn");
let replyBtn = document.querySelector(".restart");
let quitBtn = document.querySelector(".quit");
let quizRules = document.querySelector(".quiz_rules");
let quizApp = document.querySelector(".quiz_app");
let question = document.querySelector(".question");
let options = document.querySelector(".option_list");
let totalQuestion = document.querySelector(".question-left");
let timmerCount = document.querySelector(".time");
let resultBox = document.querySelector(".result_box");

let questionCount = 0;
let userScore = 0;

let tick = `<span class="material-symbols-outlined">task_alt</span>`;
let cross = `<span class="material-symbols-outlined">cancel</span>`;

document.querySelector(
  ".rules_list"
).innerHTML = `<li>1. You will have only <b>15 seconds</b> per each question.</li>
        <li>2. Once you select your answer, it can't be undone.</li>
        <li>3. You can't select any option once time goes off.</li>
        <li>4. You can't exit from the Quiz while you're playing.</li>
        <li>5. You'll get points on the basis of your correct answers.</li>`;

startBtn.addEventListener("click", () => {
  quizRules.classList.add("active");
});

exitBtn.addEventListener("click", () => {
  quizRules.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
  quizApp.classList.add("active");
  quizRules.classList.remove("active");

  showQuestion(0);
});

const showQuestion = (index) => {
  question.innerHTML = `${questions[index].numb}. ${questions[index].question}`;
  // let options =
  options.innerHTML = `<li onClick="optionSelected(this)"><span>${questions[index].options[0]}</span></li>
                       <li onClick="optionSelected(this)"><span>${questions[index].options[1]}</span></li>
                       <li onClick="optionSelected(this)"><span>${questions[index].options[2]}</span></li>
                       <li onClick="optionSelected(this)"><span>${questions[index].options[3]}</span></li>`;
  totalQuestion.innerHTML = `${questions[0].numb} of ${questions.length} questions`;
};

nextQuestionBtn.addEventListener("click", () => {
  questionCount++;
  if (questionCount <= questions.length - 1) {
    showQuestion(questionCount);
    totalQuestion.innerHTML = `${questionCount + 1} of ${
      questions.length
    } questions`;
    nextQuestionBtn.style.display = "none";
  } else {
    console.log("soto");
    showResultBox();
  }
});

let optionSelected = (element) => {
  let allOptions = options.children.length;
  for (let i = 0; i < allOptions.length; i++) {
    console.log(allOptions[i]);
    options.children[i].classList.add("disbaled");
  }
  let userAns = element.querySelector("span").innerText;
  let correctAns = questions[questionCount].answer;
  if (userAns === correctAns) {
    userScore += 1;
    element.classList.add("correct");
    element.insertAdjacentHTML("beforeend", tick);
  } else {
    element.classList.add("wrong");
    element.insertAdjacentHTML("beforeend", cross);
    for (let i = 0; i < allOptions; i++) {
      console.log(options.children[i].innerText === correctAns);
      if (options.children[i].innerText === correctAns) {
        options.children[i].classList.add("correct");
        options.children[i].insertAdjacentHTML("beforeend", tick);
      }
    }
  }
  for (let i = 0; i < allOptions; i++) {
    options.children[i].classList.add("disbaled");
  }

  nextQuestionBtn.style.display = "block";
};

const showResultBox = () => {
  quizApp.classList.remove("active");
  resultBox.classList.add("active");
  document.querySelector(
    ".score_text"
  ).innerText = ` You got ${userScore} out of 5`;
};

replyBtn.addEventListener("click", () => {
  window.location.reload();
});
