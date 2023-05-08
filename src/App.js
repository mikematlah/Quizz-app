import React from "react"
import Question from './components/Question'
import Start from './components/Start'
import {nanoid} from "nanoid"
import Answer from './components/Answer'




function App() {

const [questions,setQuestions]=React.useState([])
const [incorrect,setIncorrect]=React.useState([])
const [correct,setCorrect]=React.useState([])
const [count,setCount]=React.useState(0)
const [showIncorrect,setShowIncorrect]=React.useState(false)
const [isStarted,setIsStarted]=React.useState(false)
const [random,setRandom]=React.useState(0)


function showAnswers(){
 
  setShowIncorrect(true)
  showScore()
  setQuestions(oldData=>{
    return oldData.map(el=>{
      return {...el,showAnswers:!el.showAnswers}
    })
  })
}
function start(){
  setIsStarted(oldValue=>!oldValue)
  setShowIncorrect(false)
  setCount(0)
}
function select(id){
  setIncorrect(oldData=>{
    return oldData.map(el=>{
      return el.map(el=>{
        return {
          ...el,
          selected:id===el.id?!el.selected:el.selected
        }
      })
    
      
    })
  })
  setCorrect(oldData=>{
    return oldData.map(el=>{
      return {
        ...el,
        selected:id===el.id?!el.selected:el.selected
      }
    })
  })
}
 function showScore(){
    let score=[]
    for (let i = 0; i < correct.length; i++){
      if(correct[i].selected===true){
        score.push(correct[i].selected)
      }
    }
    setCount(score.length)
   
 }


  React.useEffect(()=>{
    fetch(`https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setIncorrect(data.results.map(el=>{
        return el.incorrect_answers.map(el=>{
          return {
            text:el,
            id:nanoid(),
            selected:false
          }
        })
      }))
      setCorrect(data.results.map(el=>{
        return {
          text:el.correct_answer,
          id:nanoid(),
          selected:false
        }
      }))
        
        setQuestions(data.results.map(el=>{
          return {
            id:nanoid(),
            question:el.question,
            showAnswers:false
            
          
          }
        }))
   
    

    })
    const random=Math.floor(Math.random()*3) + 1
    setRandom(random)


  },[isStarted])  

  const elements=[]
  for(let i = 0; i < questions.length; i++){
    const questionData=questions[i]
    const incorrectData=incorrect[i]
    const correctData=correct[i]
   
 
    
      elements.push(
      <Question
          key={questionData.id}
          text={questionData.question}
          incorrectAnswers={incorrectData}
          correctAnswer={correctData}
          select={select}
          showAnswers={questionData.showAnswers}
          showIncorrect={showIncorrect}
          random={random}
         
      
      />)
  }
 
  return(
    isStarted?
    <div className="">
     {elements}
     <div className="result">
        {showIncorrect && <p>Your score {count} / 5</p>}
        <button 
        
        className="btn"
        onClick={!showIncorrect?showAnswers:start}
        >{!showIncorrect?'Check answer':'Play again'}</button>
     </div>
     
  </div>:
  <Start
    isStarted={start}
  />
  
  )
 
  
}

export default App;
