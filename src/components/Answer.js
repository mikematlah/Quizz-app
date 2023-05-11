import React from "react"

export default function Answer(props){


   return <div 
   className={`answer
   ${props.isSelected?props.showAnswers && !props.isCorrect?'incorrect':'selected':""}
   ${props.isCorrect && props.showAnswers?"correct":""}
   
   
   `}

   onClick = {()=>{props.select(props.id)}}
   
   >{props.text}</div>
 
    }