import React, { useState } from 'react'
import { QuizData } from '../Data/QuizData'
import QuizResult from './QuizResult';
function Quiz() {
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [score,setScore] = useState(0);
    const [clickedOption,setClickedOption]=useState(0);
    const [showResult,setShowResult]=useState(false);
    const[rightAnswer, setRightAnswer]= useState(null);
    const[optionchose, setOptionChose] = useState(false);
    const[disabled, setDisabled] = useState(false)
    
    const changeQuestion = ()=>{
        updateScore();
        setOptionChose(false)
        setRightAnswer(false)
        setDisabled(false)
        if(currentQuestion< QuizData.length-1){
            setCurrentQuestion(currentQuestion+1);
            setClickedOption(0);
        }else{
            setShowResult(true)
        }
    }
    const answer= QuizData[currentQuestion].answer;
    const updateScore=()=>{
        if(clickedOption===QuizData[currentQuestion].answer){
            setScore(score+1);
            setRightAnswer(true)
        }
        else{
            setRightAnswer(true)
        }
    }
    const resetAll=()=>{
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }
    const selectOption=(i)=>{
     if(!disabled){
        setClickedOption(i+1)
        updateScore()
        setOptionChose(true)
        setDisabled(true)
     }
    }
  return (
    <div>
        <p className="heading-txt">Quiz APP</p>
        <div className="container">
            {showResult ? (
                <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll}/>
            ):(
            <>
            <div className="question">
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{QuizData[currentQuestion].question}</span>
            </div>
            <div className="option-container">
                {QuizData[currentQuestion].options.map((option,i)=>{
                    
                    return(
                        <button 
                        onClick={()=>selectOption(i)}
                        // className="option-btn"
                        className={optionchose? (rightAnswer&&(i+1)===answer? "option-btn rightanswer": (clickedOption===i+1)?"option-btn wronganswer":"option-btn"): "option-btn"}
                        key={i}
                        
                        >
                        {option}
                        </button>
                    )
                })}                
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion}/>
            </>)}
        </div>
    </div>
  )
}

export default Quiz