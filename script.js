let startBTn = document.querySelector(".start-btn");
let exponentBTn = document.querySelector(".exponent-btn");
let repeatBTn = document.querySelector(".repeat-btn");
let homeBtn = document.querySelector(".home-btn");
let homeNavBtn = document.querySelector(".home-nav-btn");
let selectionMenu = document.querySelector(".selection-menu");
let exponentElement = document.querySelector("#exponents");
let numberElement = document.querySelector("#numbers");
let resultMenu = document.querySelector(".result-menu");
let scoreContainer = document.querySelector(".score-container");
let spans = resultMenu.getElementsByTagName("span");
let checkIcon = document.querySelector("#checkIcon");
let scoreValue = document.querySelector("#scoreValue");
// let inputScoreValue = document.querySelector("#inputScoreValue");
let clock = document.querySelector("#clock");
let title = document.querySelector(".title");
let questionMenu = document.querySelector(".question-menu");
let questionMenuHeading = document.querySelector(".question-menu-heading");
let questionMenuInput = document.querySelector(".question-input");
let myAudio = document.querySelector("#audio");
let correctCount = 0;
let correct = 0;
let wrong = 0;
let menuInputValue;
let answerValue;
let displayNumArray = [];
let menuInputArray = [];
let displayNum;
let exponentValue;

const firstTenRandomNumbers = () => {
  displayNum = Math.floor(Math.random() * 10 + 1);
  return displayNum;
};

const nextTenRandomNumbers = () => {
  displayNum = Math.floor(Math.random() * 10 + 11);
  return displayNum;
};

//CountDown Function
function countdown() {
  selectionMenu.style.display = "none";
  // startBTn.style.display = "none";
  // repeatBTn.style.display = "none";
  resultMenu.style.display = "none";
  clock.style.display = "block";
  title.style.display = "none";
  scoreContainer.innerHTML = "";
  document.body.style.backgroundColor = "#219ebc";
  const getExponent = () => (exponentValue = Number(exponentElement.value));
  getExponent();

  const getNumber = () => (numberValue = Number(numberElement.value));
  getNumber();

  if (numberValue === 10) {
    firstTenRandomNumbers();
  } else if (numberValue === 20) {
    nextTenRandomNumbers();
  }

  if (exponentValue === 2) {
    questionMenuHeading.innerHTML = `${displayNum}<sup>2</sup>`;
  } else if (exponentValue === 3) {
    questionMenuHeading.innerHTML = `${displayNum}<sup>3</sup>`;
  } else {
    questionMenuHeading.innerHTML = `${displayNum}<sup>4</sup>`;
  }

  let number = document.querySelector("#seconds");
  let count = 3;

  // Countdown Interval which runs on every 1s
  let countdownInterval = setInterval(() => {
    // if count is less than or equal to 1 then clear the Interval
    if (count <= 1) {
      clearInterval(countdownInterval);
      // questionMenuHeading.style.display = "block";
      // questionMenuInput.style.display = "block";
      questionMenu.style.display = "flex";
      clock.style.display = "none";
      document.body.style.backgroundColor = "";
      questionMenuInput.addEventListener("change", handleInputChange);
      displayNumArray = [];
      menuInputArray = [];
      correct = 0;
      wrong = 0;
    }

    number.textContent = count <= 3 ? `${--count}` : `${--count}`;
  }, 1000);
}

// ShowForm Function
const showForm = () => {
  selectionMenu.style.display = "flex";
  exponentBTn.style.display = "none";
};

//HomeMenu Function
const homeMenu = () => {
  resultMenu.style.display = "none";
  scoreContainer.innerHTML = "";
  exponentBTn.style.display = "block";
  title.style.display = "flex";
  selectionMenu.style.display = "none";
};

//Start Button Event Listener
startBTn.addEventListener("click", countdown);

//Exponent Button Eevent Listener
exponentBTn.addEventListener("click", showForm);

//HandleInputChange Function
function handleInputChange(e) {
  e.preventDefault();
  // console.log("Input value:", questionMenuInput.value);
  menuInputArray.push(Number(questionMenuInput.value));
  // console.log(displayNumArray);

  // console.log(exponentValue);
  menuInputValue = questionMenuInput.value.trim();
  let answerLength;

  if (exponentValue === 2) {
    displayNumArray.push(displayNum);
    // console.log(displayNumArray);
    // console.log(menuInputArray);
    // console.log(exponentValue);
    answerLength = (displayNum ** 2).toString().length;
    answerValue = displayNum ** 2;
  } else if (exponentValue === 3) {
    displayNumArray.push(displayNum);
    answerValue = displayNum ** 3;
    answerLength = (displayNum ** 3).toString().length;
  } else {
    answerValue = displayNum ** 4;
    displayNumArray.push(displayNum);
    answerLength = (displayNum ** 4).toString().length;
  }

  if (
    menuInputValue.length === answerLength &&
    parseInt(menuInputValue) === answerValue
  ) {
    // console.log("Correct value!");
    myAudio.play();
    questionMenuInput.value = "";
    numberValue === 10 ? firstTenRandomNumbers() : nextTenRandomNumbers();
    questionMenuHeading.innerHTML = `${displayNum}<sup>${exponentValue}</sup>`;
    // console.log(displayNumArray);
    questionMenuInput.style.border = "1px solid #219ebc";
    correct++;
    correctCount++;
    if (correctCount >= 10) {
      // Disable or remove the event listener after 10 correct values
      questionMenuInput.removeEventListener("change", handleInputChange);
      // console.log("Event listener removed.");
      resultMenu.style.display = "flex";
      questionMenu.style.display = "none";
      exponentBTn.style.display = "none";
      correctCount = 0;
      // console.log(displayNumArray);
      displayScore(displayNumArray, menuInputArray, exponentValue);
    }

    spans[0].innerHTML = `Correct ${correct}`;
    spans[1].innerHTML = `Wrong ${wrong}`;
  } else {
    // console.log("Incorrect value!");
    questionMenuInput.value = "";
    questionMenuInput.style.border = "1px solid red";
    wrong++;
    // console.log(`Wrong: ${wrong}`);
    spans[1].innerHTML = `Wrong ${wrong}`;
  }
}

//DisplayScore function
function displayScore(displayNumArray, menuInputArray, exponentValue) {
  for (let i = 0; i < menuInputArray.length; i++) {
    let scoreMenu = document.createElement("div");
    scoreMenu.classList.add("score-menu");

    let checkIcon = document.createElement("span");
    checkIcon.innerHTML = "&#10003;";
    checkIcon.style.color = "#009e60";

    let scoreValue = document.createElement("p");
    scoreValue.innerHTML = `${displayNumArray[i]}<sub>${exponentValue}</sub> = <span>${menuInputArray[i]}</span>`;
    scoreValue.getElementsByTagName("span")[0].style.color = "#009e60";
    scoreValue.id = "scoreValue";
    // console.log(`Display Num: ${displayNumArray[i]}`);
    // console.log(`Input Num: ${menuInputArray[i]}`);

    // inputScoreValue.innerHTML.style.color = "#009e60";
    // inputScoreValue.id = "inputScoreValue";
    if (displayNumArray[i] ** exponentValue !== menuInputArray[i]) {
      checkIcon.innerHTML = "&#x2715;";
      checkIcon.style.color = "red";
      scoreValue.getElementsByTagName("span")[0].style.color = "red";
    }
    scoreMenu.appendChild(checkIcon);
    scoreMenu.appendChild(scoreValue);
    // scoreMenu.appendChild(inputScoreValue);
    scoreContainer.appendChild(scoreMenu);
    resultMenu.appendChild(scoreContainer);
  }
}

displayScore(displayNumArray, menuInputArray, exponentValue);

//Repeat Button Event Listener
repeatBTn.addEventListener("click", countdown);

//Home Button Event Listener
homeBtn.addEventListener("click", homeMenu);
homeNavBtn.addEventListener("click", homeMenu);
