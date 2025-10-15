const question=[
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark", correct :false},
            {text:"Blue Whale", correct :true},
            {text:"Elephant", correct :false},
            {text:"Giraffe", correct :false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
         question: "Who was the first Prime Minister of India?",
        answers: [
            { text: "Mahatma Gandhi", correct: false },
            { text: "Jawaharlal Nehru", correct: true },
            { text: "Sardar Patel", correct: false },
            { text: "Dr. Rajendra Prasad", correct: false },
        ],
    },
    {
       question: "What is the largest ocean in the world?",
        answers: [
            { text: "Indian Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false },
        ],  
    },
    {
         question: "Who invented the light bulb?",
        answers: [
            { text: "Alexander Graham Bell", correct: false },
            { text: "Nikola Tesla", correct: false },
            { text: "Thomas Alva Edison", correct: true },
            { text: "Isaac Newton", correct: false },
        ],
    },
];

const questionele=document.getElementById("question");
const ansele=document.getElementById("answer-btn");
const nextbtn=document.getElementById("next-btn");

function startquiz(){
    currentQuestionIndex=0;
    score=0;
    nextbtn.innerHTML="Next";
    showquestion();
}

function showquestion(){
    resetState();
    let currentQuestion=question[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionele.innerHTML=questionNo+" "+currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansele.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}

function resetState(){
    nextbtn.style.display="none";
    while(ansele.firstChild){
        ansele.removeChild(ansele.firstChild);
    }
}

function selectanswer(e){
    const selectedbtn=e.target;
    const isCorrect=selectedbtn.dataset.correct==="true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    } else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(ansele.children).forEach(button => {
        if(button.dataset.correct==="true"){
        button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbtn.style.display="block";
}

function showscore(){
    resetState();
    questionele.innerHTML=`You scored ${score} out of ${question.length}!`;
    nextbtn.innerHTML="Play Again";
    nextbtn.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<question.length){
        showquestion();
    }else{
        showscore();
    }
}

nextbtn.addEventListener("click",()=> {
    if(currentQuestionIndex<question.length){
        setTimeout(handleNextButton,400);
    } else{
        startquiz();
    }
})
startquiz(); 