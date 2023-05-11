import React from "react"
import Question from './components/Question'
import Start from './components/Start'
import {nanoid} from "nanoid"
import {decode} from 'html-entities';





function App() {

const [questions,setQuestions]=React.useState([])
const [isStarted,setIsStarted] = React.useState(false)
const [count,setCount] = React.useState(0)
const [showAnswers,setShowAnswers] = React.useState(false)

function insertAt(array, index, ...elementsArray) {
  array.splice(index, 0, ...elementsArray);
}
function getrandomNum(arr){
  const randomNum = Math.floor((Math.random() * arr.length) + 1);
  return randomNum
}
function select(id){
    const selectedQuestions = questions.map((question)=>{
    return{...question,answers:question.answers.map((answer)=>{
      return {...answer,isSelected:answer.id === id?!answer.isSelected:answer.isSelected}
    })}
  })
  setQuestions(prevValue=>prevValue = selectedQuestions)
 
}
function calculateScore(){
  for(let question of questions){
    
      for(let answer of question.answers){
        if(answer.isCorrect && answer.isSelected){
          setCount(prevValue=>prevValue +1)
        }
    }
         
  }
}


function start(){

  setIsStarted(prevValue=>!prevValue)
  setShowAnswers(false)
  setCount(0)
}
function getAnswers(){
  setShowAnswers(prevValue=>!prevValue)
  calculateScore()
}

  React.useEffect(()=>{
 fetch(`https://opentdb.com/api.php?amount=5`)
    .then(res=>res.json())
    .then(data=>{
   
      
      const questonsData = data.results
    
      const incorrectAnswers = questonsData.map(el=>el.incorrect_answers)
      const correctAnswers = questonsData.map(el=>el.correct_answer)
      
      const incorrectAnswObj = incorrectAnswers.map((el)=>{
          return el.map((answer)=>{
              return {
                text:answer,
                isCorrect:false,
                id:nanoid(),
                isSelected:false}
          })
      })
      
      let allAnswers = []
      for(let i = 0;i < incorrectAnswObj.length;i++){
            insertAt(incorrectAnswObj[i],getrandomNum(incorrectAnswObj[i]),{
              text:correctAnswers[i],
              isCorrect:true,
              id:nanoid(),
              isSelected:false})
           
            allAnswers.push(incorrectAnswObj[i])

      }
      
  
      let newData = []
      for(let i = 0;i < questonsData.length;i++){
        newData.push({
            question:decode(questonsData[i].question),
            answers:allAnswers[i]
        })

    }

        
    setQuestions(newData.map((el)=>{
      return {
        id:nanoid(),
        question:el.question,
        answers:el.answers
      }
    }))
   
    

    })

  },[isStarted])  

 


  const elements= questions.map((el)=>{
    return (
      <Question
          key={el.id}
          question = {el.question}
          answers = {el.answers}
          select = {select}
          showAnswers = {showAnswers}


      />
    )
  })

  
 

 
  return(
    isStarted?
    <div className="">
      {elements}
      <div className="result">
        {showAnswers && <p>Your score {count} / 5</p>}
        <button 
        
        className="btn"
        onClick={!showAnswers?getAnswers: start}
        >{!showAnswers?'Check answer':'Play again'}</button>
     </div>
    
     
    </div>:
      <Start
      isStarted = {start}
    />
 
  
  )
 
  
}

export default App;

/*API: https://opentdb.com/api_config.php*/