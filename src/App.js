import {useState,useEffect,useRef} from 'react';

import Toolbox from 'components/toolbox/Toolbox';
import Board from 'components/board/Board';

import dateTime from 'utils/dateTime';

import './App.css';

function App() {
  const [isDrawing,setIsDrawing]=useState(false);
  const [paintingTool,setPaintingTool]=useState({
    type: "brush",
    width: 5,
    color: "red"
  });
  const {type,width,color}=paintingTool;

  const canvasRef=useRef(null);
  const contextRef=useRef(null);
  
  useEffect(()=>{
    const canvas=canvasRef.current;
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;

    const ctx=canvas.getContext("2d");

    // 背景
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    // 筆刷
    ctx.lineCap="round";
    ctx.lineWidth=width;
    ctx.strokeStyle=color;
    contextRef.current=ctx;
  },[]);
  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas.getContext("2d");
    
    ctx.strokeStyle=color;
    if(type==="eraser"){
      ctx.lineWidth=width*10;
    }
    else{
      ctx.lineWidth=width;
    }
  },[paintingTool]);

  const changeTypeHandler=(type)=>{
    if(type==="eraser"){
      setPaintingTool({
        ...paintingTool,
        type,
        color: "white"
      });
    }
    else{
      setPaintingTool({
        ...paintingTool,
        type,
        color: "red"
      });
    }
  };

  const changeWidthHandler=(e)=>{
    setPaintingTool({
      ...paintingTool,
      [e.target.name]: e.target.value
    });
  };

  const changeColorHandler=(e)=>{
    if(type==="brush"){
      setPaintingTool({
        ...paintingTool,
        [e.target.name]: e.target.value
      });
    }
  };

  const startDrawing=(e)=>{
    e.preventDefault();
    setIsDrawing(true);

    const {offsetX,offsetY}=e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX,offsetY);
    contextRef.current.lineTo(offsetX,offsetY);
    contextRef.current.stroke();
  };

  const onDrawing=(e)=>{
    e.preventDefault();
    if(!isDrawing) return;

    const {offsetX,offsetY}=e.nativeEvent;
    contextRef.current.lineTo(offsetX,offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing=()=>{
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  const clearHandler=()=>{
    contextRef.current.clearRect(0,0,canvasRef.current.offsetWidth,canvasRef.current.offsetHeight);
  };

  const saveHandler=()=>{
    const link=document.createElement("a");
    link.download=`${dateTime()}.jpg`;
    link.href=canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <section className="section-padding bg-height bg-color">
      <div className="container container-padding">
        <div className="drawing-flex">
          <Toolbox paintingTool={paintingTool} changeTypeHandler={changeTypeHandler} changeWidthHandler={changeWidthHandler} changeColorHandler={changeColorHandler} clearHandler={clearHandler} saveHandler={saveHandler} />
          <Board canvasRef={canvasRef} startDrawing={startDrawing} onDrawing={onDrawing} stopDrawing={stopDrawing} />
        </div>
      </div>
    </section>
  );
}

export default App;