

const questions = [
    {
        'que' : "The probability of all the events in a sample space adds up to?",
        'a': "0",
        'b': "1",
        'c': "2",
        'd': "3",
        'correct': "b"
    },

   {
        'que' : "If the events have the same theoretical probability of happening, then they are called?",
        'a': "Mutually exclusive events",
        'b': "Mutually exhaustive events",
        'c': "Equally likely events",
        'd': "Impossible event ",
        'correct' : "c"

   },

   {
        'que': "The complement of P(A) is ?",
        'a':  "1-P(A)",
        'b': "1+P(A)",
        'c':  "1/P(A)",
        'd': "1*P(A)",
        'correct': "a"
      
   },

   {
        'que': "The probability which is based on the observations of an experiment is called",
        'a':  "Theoretical Probability",
        'b': "Axiomatic Probability",
        'c':  "Experimental Probability",
        'd':  "None of these",
        'correct': "c"
   },

   {
        'que': "A card is drawn from the set of 52 cards. Find the probability of getting a queen card.?",
        'a': "1/52",
        'b': "1",
        'c': "1/26",
        'd':  "1/13",
        'correct': "d"
   },

   {
    'que': "What is the probability that a number selected from the numbers (1, 2, 3,..........,15) is a multiple of 4?",
    'a': "2/5",
    'b': "1/5",
    'c': "3/11",
    'd':  "2/7",
    'correct': "b"
},

{
  'que': "If three coins are tossed simultaneously, then the probability of getting at least two heads, is",
  'a': "1",
  'b': "1/2",
  'c': "3/2",
  'd':  "5/7",
  'correct': "b"
},

{
  'que': "The probability of getting exactly one head in tossing a pair of coins is",
  'a': "1/2",
  'b': "1/4",
  'c': "1",
  'd':  "0",
  'correct': "b"
},

{
  'que': "Most frequently occurring value in the data set is called",
  'a': "Mean",
  'b': "Median",
  'c': "Mode",
  'd':  "Variance",
  'correct': "c"
},

{
  'que': "What is the probability of getting a sum 9 from two throws of a dice?",
  'a': "1/6",
  'b': "1/8",
  'c': "1/9",
  'd':  "1/12",
  'correct': "c"
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
