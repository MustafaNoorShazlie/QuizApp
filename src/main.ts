
//importing "questions" array from questions.ts

import { questions } from "./questions";

//necessary variables declaration

let currentIndexQuestion = -1;
let studentsCompleted = 1;
let studentAnswerForm:any = [];
let startAndNextButton = document.getElementById("start-button");
let quizContainer = document.getElementById("quiz-container");
let goBack = document.getElementById("go-back");
let upperUI = document.getElementById("top-settings");
let startingTime = 600;
let time = 600;
let timeView = document.getElementById("time-viewer");
let timerRunning = false
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
let resultPercentage = "0";
let timePassed = document.getElementById("time-passed");




//function declaration

function resetQuiz(){
  timePassed!.innerHTML = ''; 
  studentAnswerForm = [];
  correctAnswerCount = 0;
  wrongAnswerCount = 0;
  resultPercentage = "0";
  timeView!.innerHTML = '10:00';
  timerRunning = false;
  timerModeChecker();
  time = 600;
  quizContainer!.innerHTML=``;
  startAndNextButton!.innerHTML= "Start";
  currentIndexQuestion = 0;
  progressbarUpdater();
  currentIndexQuestion= -1;
  upperUI!.className = "fixed-ui hide";
  quizContainer!.innerHTML=`<div id="info-container">
  <img id="preview-image" src="/assets/quiz-preview.png">
  <h1 id="quiz-title">CSS Quiz</h1>
  <p id="answer-number">Questions</p>
  <p id="students-completed"><ion-icon name="checkmark-circle"></ion-icon>Students Finished This Quiz</p>
  </div>`;
  let questionInfo = document.getElementById("answer-number");
  let studentsCompletedLabel = document.getElementById("students-completed");
  questionInfo!.innerHTML = `${questions.length} questions`;
  studentsCompletedLabel!.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon>${studentsCompleted} Students Finished This Quiz`
}

function startQuiz(){
  quizContainer!.innerHTML=`<div id="question-container">
  <p id="question-text">Question Content</p>
  </div>
  <div id="form-container">
    <form id="answer-form">
        <div id="answer-form-div">Answer Container</div>
    </form>
  </div>`
  upperUI!.className = "fixed-ui";
  questionRenderer()
  timerRunning = true;
  timerModeChecker();
}

function nextQuestion(){
  
  if(currentIndexQuestion+1 == questions.length-1){
    getAnswer();
    startAndNextButton!.innerHTML="Finish";
    currentIndexQuestion++;
    questionRenderer();
    progressbarUpdater();
  }
  else if (currentIndexQuestion == -1){
    currentIndexQuestion++;

    startAndNextButton!.innerHTML="Next";
    startQuiz();
    questionRenderer();
    progressbarUpdater();
    
  }
  
  else if(currentIndexQuestion >= 0 && currentIndexQuestion<questions.length-1){
    getAnswer()
    currentIndexQuestion++;
    questionRenderer();
    progressbarUpdater();
    
  }
  else if(currentIndexQuestion == questions.length-1){
    getAnswer();
    startAndNextButton!.innerHTML="Retake";
    
    currentIndexQuestion++;
    
    timerRunning = false;
    timerModeChecker();
    resultCalculate();
    resultShow();
    timeCalculate();
  }
  else if(currentIndexQuestion == questions.length){
    startAndNextButton!.innerHTML="Start";
    
    currentIndexQuestion=-1;
    
    resetQuiz();
  }
  
}



function questionRenderer() {
    let answerFormDiv = document.getElementById("answer-form-div");
    let questionText = document.getElementById("question-text");
    let currentQuestion:any = questions[currentIndexQuestion];
    questionText!.innerHTML = currentQuestion.questionContent;

    if (currentQuestion.inputType == "checkbox" || currentQuestion.inputType == "radio"){
      let questionList = [];
      for (let i in currentQuestion.questionOptions){
        questionList.push(currentQuestion.questionOptions![i]);
      }
      answerFormDiv!.innerHTML = questionList.map((optionContent, index) =>{
        return `<div class="answer-div answer-${currentQuestion.inputType}" id="answer-div-${index}">
                  <input class="answer-input" id="${currentQuestion.inputType}-input-${index}" type="${currentQuestion.inputType}" name="Answer" value="${optionContent}">
                  <div class="${currentQuestion.inputType}-button-design"></div>
                  <label class="answer-text" for="${currentQuestion.inputType}-input-${index}" id="option-text-${index}">${optionContent}</label>
                </div>`
      }).join("")
    }
    else if (currentQuestion.inputType == "textarea"){

      answerFormDiv!.innerHTML = `<div class="answer-textarea-div">
                                    <textarea class="answer-textarea" name="Answer" id="textarea-input" cols="30" rows="10"></textarea>
                                  </div>`;
    }
}

function progressbarUpdater(){
  let bar = document.getElementById("progress-bar-progress");
  bar!.style.width = `${currentIndexQuestion / questions.length * 100}%`;
}

function getAnswer(){
  const optionsAvailable = Array.from(document.getElementsByName("Answer"));
  const currentQuestion = questions[currentIndexQuestion];

  if (currentQuestion.inputType == "radio" || currentQuestion.inputType == "checkbox"){
    const answerData = {
      questionId : currentQuestion.questionNumber,
      questionType: currentQuestion.inputType,
      answer: optionsAvailable.map((option) =>{
        if(option.checked){
          return option.value;
        }
      }).filter(x => x)
    }
    studentAnswerForm.push(answerData);
  }
  else{
    const answerData = {
      questionId : currentQuestion.questionNumber,
      questionType: currentQuestion.inputType,
      answer: Array.from(document.getElementById("textarea-input")!.value).join("")
    }
    studentAnswerForm.push(answerData);
  }
  console.log(studentAnswerForm)
}

let timer = setInterval(() =>{timerModeChecker();}, 1000)

let timerModeChecker = ()=>
{  
    if (timerRunning == true)
    {  let minutes = Math.floor(time/60);
      let seconds = time % 60;

      if (minutes < 10 && seconds > 10){
        timeView!.innerHTML = `0${minutes}:${seconds}`
      }
      else if(minutes < 10 && seconds < 10){
        timeView!.innerHTML = `0${minutes}:0${seconds}`
      }

      if(time != 0){
        time -= 1;
      }
      else{
        clearInterval(timer)
      }}
  }

  function resultShow(){
    quizContainer!.innerHTML=`<div id="result-container">
    <h1>YOUR RESULT IS</h1>
    <div id="result-mark">
        <p>${resultPercentage.slice(0,5)}%</p>
        <div id="correct-wrong-container">
            <div id="correct-number">${correctAnswerCount} Correct Answer</div>
            <div id="wrong-number">${wrongAnswerCount} Wrong Answer</div>
        </div>
    </div>
</div>`
upperUI!.className = "fixed-ui hide";
  }

function timeCalculate(){
  let minutes = Math.floor((startingTime - time)/60);
  let seconds = ((startingTime - time)%60)-1;
  if(seconds<10){
    timePassed!.innerHTML = `[${minutes}:0${seconds}]`;
  }
  else{
    timePassed!.innerHTML = `[${minutes}:${seconds}]`;
  }
  
}

function resultCalculate(){
  for (let i in studentAnswerForm){
    let questionIdToCheck = studentAnswerForm[i].questionId;
    let questionAnswerToCheck = studentAnswerForm[i].answer;
    let questionTypeToCheck = studentAnswerForm[i].questionType;



    let targetQuestion = questions.find(element => element.questionNumber === questionIdToCheck)
    let answerKey = Object.keys(targetQuestion!.questionOptions).filter(key => questionAnswerToCheck.includes(targetQuestion!.questionOptions[key]));
    console.log(questionAnswerToCheck);
    console.log(answerKey);
    console.log(targetQuestion!.correctOptions);
    
    if (questionTypeToCheck === "radio" || questionTypeToCheck === "checkbox")
    {  
      if (answerKey.every((value, index) => { return value === targetQuestion!.correctOptions[index]}) === true && answerKey.length!=0){
        console.log("correct answer is found");
        correctAnswerCount++
      }
      else{
        console.log("wrong answer is found")
        wrongAnswerCount++
      }
    }
    else if(questionTypeToCheck === "textarea"){
      if (questionAnswerToCheck.toLowerCase().replace(/[\r\n ]/gm, '') === targetQuestion!.correctOptions.toLowerCase()){
        console.log("correct text answer is found");
        correctAnswerCount++
      }
      else{
        console.log("wrong text answer is found");
        wrongAnswerCount++
      }
    }
  }
  resultPercentage = (correctAnswerCount / (correctAnswerCount + wrongAnswerCount)*100).toString()
}

//THE MAIN CODE

//Event listeners
startAndNextButton?.addEventListener("click", nextQuestion);
goBack!.addEventListener("click", resetQuiz);

//main function

resetQuiz();