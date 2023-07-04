const questions = [
    {
       'que' :" Laxman's father is 5 times the age of Laxman. 4 years ago Laxman's father was 7 time the age of Laxman.Find the present of of Laxman ",
       'a': "6 year ",
       'b': "8 year ",
       'c': "9 year ",
       'd': " 12 year",
       'correct': "d"
    }, 
        
    {
        'que' :" The sum of ages of 5 children bornat the intervals of 3 years each is  50 years. what is the age of the youngest child?",
        'a': "4 years",
        'b': "8 years ",
        'c': " 10 years",
        'd': " None of these",
        'correct': " a"
    }, 

    {
        'que' :"A father said to his son, I wasas old as you are at the present at the     time     of your birth. if the father's age is 38 years now, the son's age fiveyears back was: ",
        'a': "14 years ",
        'b': "19 years ",
        'c': "3 years ",
        'd': "38 years ",
        'correct': "a "
    }, 
    {
        'que' :" A is two year's older than B who is twice as old as C. if the total ofthe ages of A, B and C be 27, the how old is B",
        'a': " 7",
        'b': " 8",
        'c': " 9",
        'd': " 10",
        'correct': "d "
    },
    {
       'que' :"Present ages of sameer and Anand are in hte rtio of 5:4 respectively. Three years hence, the ratio of their ages will become 11:9 respectively. What is Anand's age in years? ",
       'a': " 24",
       'b': " 27",
       'c': " 40",
       'd': "Can no be determined ",
       'correct': " a"
    },    
    {
        'que' :"A man is 24 years older than his son. In two years, his age will be twice the age of his son. The present age of his son is: ",
        'a': "14 years",
        'b': " 18 years",
        'c': " 20 years",
        'd': "22 years ",
        'correct': "d "
    },
    {
        'que' :"Six years ago, the ratio of the ages of Kunal and sagar was 6:5. Four years hence,the ratio of their ages will be 11:10. What is Sagar's age at present? ",
        'a': " 16years",
        'b': " 18years",
        'c': "20years ",
        'd': " Cannot Be detetrmined ",
        'correct': " a"
    }, 

    {
         'que' :"The sum of the present ages of a father and his son is 60 years. Six years ago, father's age was five times the age of the son. After 6 years, son's age will be: ",
        'a': "12 years ",
        'b': " 14 years",
        'c': " 18 years",
        'd': "20 years ",
        'correct': " d"
}, 
{
        'que' :"At present, the ratio between the ages of Arun and Deepak is 4:3. After 6 years, Arun's age will be 26 years. What is the age of Deepak at present?  ",
         'a': " 12 years",
        'b': "15 years ",
        'c': "19 years ",
        'd': "21 years ",
        'correct': "b "
        }, 
    {                             
       'que' :"Sachin is younger than Rahul by 7 years. If their ages are in the respective ratio of 7:9, how old is Sachin? ",
       'a': "16 years ",
       'b': "18 years ",
       'c': "28 years",
       'd': "24.5 years ",
        'correct': " d"
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
