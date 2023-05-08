import { nanoid } from "nanoid"
import React from "react"
import Answer from './Answer'

export default function Question(props){


const elements= props.incorrectAnswers.map(el=>{
    return <Answer
            key={el.id}
            id={el.id}
            selected={el.selected}
            text={el.text}
            select={props.select}
            showIncorrect={props.showIncorrect}
            
       

    />
})
elements.splice(props.random,0,<Answer
        key={props.correctAnswer.id}
        id={props.correctAnswer.id}
        selected={props.correctAnswer.selected}
        text={props.correctAnswer.text}
        select={props.select}
        showAnswers={props.showAnswers}

/>)


 
    return (
    <div className="question">
        <h4>{props.text}</h4>
        <div className="answers">
          {elements}

        </div>
    </div>
 
    )}
    
    
