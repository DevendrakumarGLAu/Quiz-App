const questions = [
    {
        'que' : "Alfred buys an old scooter for Rs. 4700 and spends Rs. 800 on its repairs. If he sells the scooter for Rs. 5800, his gain percent is:",
        'a': "32/7 %",
        'b': "60/11 %",
        'c': "10 %",
        'd': "12 %",
        'correct': "b"
    },

   {
        'que' : "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:",
        'a': "15",
        'b': "16",
        'c': "18",
        'd': "25",
        'correct' : "16"

   },

   {
        'que': "If selling price is doubled, the profit triples. Find the profit percent.",
        'a':  "66.66 %",
        'b': "100 %",
        'c':  "90 %",
        'd': "120 %",
        'correct': "b"
      
   },

   {
        'que': "In a certain store, the profit is 320% of the cost. If the cost increases by 25% but the selling price remains constant, approximately what percentage of the selling price is the profit",
        'a':  "30 %",
        'b': "70 %",
        'c':  "100 %",
        'd':  "125 %",
        'correct': "b"
   },

   {
        'que': "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
        'a': "3",
        'b': "4",
        'c': "5",
        'd':  "6",
        'correct': "c"
   },

   {
    'que': "The percentage profit earned by selling an article for Rs. 1920 is equal to the percentage loss incurred by selling the same article for Rs. 1280. At what price should the article be sold to make 25% profit?",
    'a': "Rs. 2000",
    'b': "Rs. 2200",
    'c': "Rs. 2400",
    'd':  "Rs. 2100",
    'correct': "a"
},

{
    'que': "A shopkeeper expects a gain of 22.5% on his cost price. If in a week, his sale was of Rs. 392, what was his profit?",
    'a': "Rs. 18.20",
    'b': "Rs. 70",
    'c': "Rs. 72",
    'd':  "Rs. 82.88",
    'correct': "c"
},

{
    'que': "A man buys a cycle for Rs. 1400 and sells it at a loss of 15%. What is the selling price of the cycle?",
    'a': "Rs. 1090",
    'b': "Rs. 1160",
    'c': "Rs. 1190",
    'd':  "Rs. 1202",
    'correct': "c"
},

{
    'que': "Sam purchased 20 dozens of toys at the rate of Rs. 375 per dozen. He sold each one of them at the rate of Rs. 33. What was his percentage profit?",
    'a': "3.5",
    'b': "5.6",
    'c': "4.5",
    'd':  "6.5",
    'correct': "b"
},

{
    'que': "On selling 17 balls at Rs. 720, there is a loss equal to the cost price of 5 balls. The cost price of a ball is:",
    'a': "Rs. 45",
    'b': "Rs. 50",
    'c': "Rs. 55",
    'd':  "Rs. 60",
    'correct': "d"
},

]


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
