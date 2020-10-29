import React, {useState,useEffect} from 'react';
import '../src/assets/main.css';
import SplitPane, { Pane } from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';
import TestCaseModal from './TestCaseModal';
import ProblemCode from './ProblemCode';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import Problem from './Problem';
import ProblemTitle from './component/ProblemTitle'
import ProblemLanguage from './component/ProblemLanguage'
import Axios from 'axios';

function App(props) {
  const [show, setShow] = useState(false);
  const [go,setGo] = useState(true)
  const [index,setIndex] = useState("")
  const [code,setCode] = useState("const")
  const [testCase,setTestCase] = useState("")
  const [language,setLanguage] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toBackEnd = async(e,language,testCase,code,index) => {
    console.log(language)
    e.preventDefault()
    var result;
        try{
            result = await Axios.post(`/api/toBackEnd`,{language : language, 
            testCase: testCase, code:code, index:index});
        } catch(error) {
            alert(error)
        }
    }

  return (
    <div className="App">
      <div className="header">
        문제이름
        <span className = "problem-number">
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="outline-dark" onClick={()=>setIndex(1)}>1</Button> <Button variant="outline-dark" onClick={()=>setIndex(2)}>2</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </span>
        <div className = "problem-language">
          <ProblemLanguage setLanguage={setLanguage}></ProblemLanguage>
          </div>
      </div>

      <div className="main-section" >
        <SplitPane split="vertical" height="80%" defaultSize={350}  minSize={50}>
          <div className= "problem">
            <ProblemTitle main={"문제 설명"}></ProblemTitle>
              <Problem></Problem>
          </div>
        <SplitPane  split="horizontal" defaultSize={350} minSize={350} >
          <div className="codestyle">소스코드
            <Button variant="dark" className="reset-button"onClick = {() => setCode("")}>
              초기화
            </Button>
            <ProblemCode setGo={setGo} go={go} code={code} setCode={(value)=>setCode(value)} ></ProblemCode>          
          </div>
          <div className="codestyle">소스결과
          </div>
        </SplitPane>
        </SplitPane>
      </div>

    <div className="footer">
      <Button variant="secondary" onClick={()=>handleShow(true)}>
        테스트 케이스 추가하기
      </Button>
      <Button className="send" variant="secondary" onClick={e => toBackEnd(e,language,testCase,code,index)}>
        채점 및 제출 
      </Button>
      <TestCaseModal show={show} handleClose={handleClose} handleShow={handleShow} 
       setTestCase={setTestCase}>
      </TestCaseModal>

      </div>

    </div>
    
  );
}
export default App;


