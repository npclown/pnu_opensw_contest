import '../assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import React, {useState,useEffect} from 'react';
import '../assets/problemresult.css'
function ProblemResult(props) {

    return(
        <div className="problemresult ">
          <div>
          {props.result.data.score}
          {props.result.data.result.map((problemresult, index)=>{
              return(
                <div>
                  <div>                
                  {problemresult.success?("성공"):("실패")}
                  </div>
                  <div>                
                  {problemresult.time}
                  </div>
                </div>

            )
          })}

          </div>            
            
        </div>

      
  );
}
export default ProblemResult;
