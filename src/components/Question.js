import { nanoid } from "nanoid"
import React from "react"
import Answer from './Answer'

export default function Question(props){


const answers= props.answers.map(el=>{
    return <Answer
            key={el.id}
            id={el.id}
            text={el.text}
            isSelected = {el.isSelected}
            isCorrect = {el.isCorrect} 
            select = {props.select}
            showAnswers = {props.showAnswers}
            
            
       

    />
})



 
    return (
    <div className="question">
        <h4>{props.question}</h4>
        <div className="answers">
          {answers}

        </div>
    </div>
 
    )}
    
    
