import React from "react"


export default function Start(props){
   
    return(
       <div className="start">
           
                <h1>Quizzical</h1>
                <p>Try to pass the quizz</p>
                <button
                    onClick={props.isStarted}

                >
                Start quiz</button>
            
       </div>
    )
}