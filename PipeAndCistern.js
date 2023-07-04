const questions = [
  {
    que: "A tank is filled in 5 hours by three pipes A, B and C. The pipe C is twice as fast as B and B is twice as fast as A. How much time will pipe A alone take to fill the tank?",
    a: "20 hours",
    b: "25 hours",
    c: "35 hours",
    d: "none",
    correct: "c",
  },

  {
    que: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both the pipes are used together, then how long will it take to fill the tank?",
    a: "12 min",
    b: "15 min",
    c: "25 min",
    d: "50 min",
    correct: "a",
  },

  {
    que: "One pipe can fill a tank three times as fast as another pipe. If together the two pipes can fill the tank in 36 minutes, then the slower pipe alone will be able to fill the tank in:",
    a: "81 min",
    b: "108 min",
    c: "144 min",
    d: "192 min",
    correct: "c",
  },

  {
    que: "A large tanker can be filled by two pipes A and B in 60 minutes and 40 minutes respectively. How many minutes will it take to fill the tanker from empty state if B is used for half the time and A and B fill it together for the other half?",
    a: "15 min",
    b: "20 min",
    c: "27.5 min",
    d: "30 min",
    correct: "d",
  },

  {
    que: "A tap can fill a tank in 6 hours. After half the tank is filled, three more similar taps are opened. What is the total time taken to fill the tank completely?",
    a: "3 hrs 15 min",
    b: "3 hrs 45 min",
    c: "4 hrs",
    d: "4 hrs 45 min",
    correct: "b",
  },

  {
    que: "Three pipes A, B and C can fill a tank in 6 hours. After working at it together for 2 hours, C is closed and A and B can fill the remaining part in 7 hours. The number of hours taken by C alone to fill the tank is:",
    a: "10",
    b: "14",
    c: "16",
    d: "12",
    correct: "b",
  },

  {
    que: "Two pipes A and B can separately fill a tank in 2 minutes and 15 minutes respectively. Both the pipes are opened together but 4 minutes after the start the pipe A is turned off. How much time will it take to fill the tank?",
    a: "9 min",
    b: "10 min",
    c: "15 min",
    d: "18 min",
    correct: "b",
  },

  {
    que: "A cistern has a leak which would empty the cistern in 20 minutes. A tap is turned on which admits 4 liters a minute into the cistern, and it is emptied in 24 minutes. How many liters does the cistern hold?",
    a: "480 liter",
    b: "600 liter",
    c: "720 liter",
    d: "800 liter",
    correct: "a",
  },

  {
    que: "Two taps can separately fill a cistern 10 minutes and 15 minutes respectively and when the waste pipe is open, they can together fill it in 18 minutes. The waste pipe can empty the full cistern in?",
    a: "7 min",
    b: "13 min",
    c: "23 min",
    d: "9 min",
    correct: "d",
  },

  {
    que: "Two pipes A and B can fill a tank in 4 and 5 hours respectively. If they are turned up alternately for one hour each, the time taken to fill the tank is?",
    a: "2 hrs 15 min",
    b: "4 hrs 24 min",
    c: "5 hrs",
    d: "3 hrs",
    correct: "b",
  },
];


let index = 0;
let total = questions.length;

 let right=0;
 let wrong= 0;
 let unattempted= 0;
const questionBox = document.getElementById("queBox");
const optionInputs = document.querySelectorAll(".options");
let LeftTime = document.getElementById("timerbox");
let startTime;
let endTime;
let TotalTimeInSeconds =0;
let timer;
let totalTime = 0;

const getSelectedOption = () => {
  let selectedOption = null;
  optionInputs.forEach((input) => {
    if (input.checked) {
      selectedOption = input.value;
    }
  });
  return selectedOption;
};


const previousQuestion = () => {
  if (index > 0) {
    index--;
    const selectedOption = getSelectedOption();
    questions[index].selectedOption = selectedOption; // Store the selected option in the array
    loadQuestion();
  }
};

const loadQuestion = () => {
  startTime = new Date();
  endTime = new Date();
  
  if (index === total) {
   
    TotalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
    // console.log("Total Time Taken: " + TotalTimeInSeconds + " seconds");
    return endQuiz();
  }
  else{
    timeChangeFunction();
    reset(); 
  }
  const data = questions[index];
  questionBox.innerText = `${index + 1}) ${data.que}`;
  optionInputs[0].nextElementSibling.innerText = data.a;
  optionInputs[1].nextElementSibling.innerText = data.b;
  optionInputs[2].nextElementSibling.innerText = data.c;
  optionInputs[3].nextElementSibling.innerText = data.d;

  if (data.selectedOption) {
    optionInputs.forEach((input) => {
      if (input.value === data.selectedOption) {
        input.checked = true;
      }
    });
  }

  updateButtonVisibility();

  if (!timer) {
    timeChangeFunction();
  }
};

const updateButtonVisibility = () => {
  if (index === 0) {
    document.getElementById("prev").style.display = "none";
  } else {
    document.getElementById("prev").style.display = "inline-block";
  }
  if (index === total - 1) {
    document.getElementById("next").textContent = "Finish";
  } else {
    document.getElementById("next").textContent = "Next Question";
  }
};

const submitQuiz = () => {
  const data = questions[index];
  let ans = getAnswer();
  //  console.log(ans, data);
        if (ans === data.correct) {
          right++;
          document.getElementById("scorebox").textContent = "SCORE: " + right;
        } 
        else if (ans !== null)
        {
         wrong++
          // console.log(ans, data);
        } 
        else {
          unattempted++;
        }
  index++;
  loadQuestion();
};

const timeChangeFunction = (TotalTime=10) =>{
  clearInterval(timer);
    
     timer = setInterval( ()=>{
        if (TotalTime <=0)
        {
            clearInterval(timer);
            document.getElementById("next").click();   
        }
        else {
            LeftTime.value = TotalTime;
            LeftTime.textContent = "Time Left: "+  TotalTime;
            TotalTime -=1;
             }
    },1000);
}


const getAnswer = () => {
  let answer=null;
  optionInputs.forEach((input) => {
    if (input.checked) {
      console.log("yes")
      answer = input.value;
    }
  });
  return answer;
};

const reset = () => {
  optionInputs.forEach((input) => {
    input.checked = false;
  });
};

function GoToHomePage()
{
    window.location = 'index.html';
}

const endQuiz = () => {
  document.getElementById("box").innerHTML = `
    <div>
     <h3>Quiz Result</h3><br>

      <p> Hello your score is: </p><br>
        <P> Total Question : <b>${total}</b> </P><br>
        
        <p> Time Taken: <b> ${TotalTimeInSeconds} seconds</b><p><br>
        <P> Attempt: <b> ${right+ wrong } </b> </P><br>
        <p> Unattempted: <b> ${unattempted}</b><p><br>
        <p> Correct: <b> ${right}</b><p><br>
        <p> Wrong: <b> ${wrong}</b><p><br>
        <p> Percentage: <b> ${(right/total)*100}</b><p><br>
         <div class="j_btn">
            <button class="quiz_btn" onclick="history.go(0)">Start Again</button>
            <button  class="quiz_btn" onclick="GoToHomePage()">Go To Home</button>
         </div>
    </div>   
    `;
};
loadQuestion();
