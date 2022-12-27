import { useState } from 'react';
import './App.css';


function App() {

  const [dot, newDot] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleDot = (e)=>{
    const newSpan = {
      clientX: e.clientX,
      clientY: e.clientY
    }

    newDot((prev)=> [...prev, newSpan]);
  }

  const handleUndo = (e)=>{
      e.stopPropagation();

      const lastItem = dot[dot.length - 1];
      setUndid((prev)=> [...prev, lastItem]);


      newDot((prev)=>{
        const newArr = [...prev].slice(0, -1);
        return newArr;
      })
  }

  const handleRedo = (e)=>{
    e.stopPropagation();

    if(undid.length === 0){
      return;
    }

    const lastItem = undid[undid.length - 1];
    newDot((prev)=> [...prev, lastItem]);
    setUndid((prev)=>{
      const newArr = [...prev].slice(0, -1);
      return newArr;
    })
  }

  


  return (
    <div className="app" onClick={handleDot}>
      <div className='btns'>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      </div>
      {dot.map((item)=>(
        <span className='span' style={{top: item.clientY, left: item.clientX}}/>
      ))}
     
      
    </div>
  );
}

export default App;
 

  

