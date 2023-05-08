import React from "react"

export default function Answer(props){


   return <div 
      className={`answer
       ${props.showAnswers?"correct":""} 
       ${props.selected && !props.showAnswers?"selected":""}
       ${props.showIncorrect && props.selected?"incorrect":""}`
      }
      onClick={()=>props.select(props.id)}
   
   >{props.text}</div>
 
    }