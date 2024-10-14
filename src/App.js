import { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { LC, NC, SC, UC } from './data/passChar';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [numbers, setNumbers] = useState(false);
  let [symbols, setSymbols] = useState(false);

  let [passwordLen,setPasswordLen] = useState(10);
  
  let [showFinalPwd,setShowFinalPwd] = useState('')

  let createPassword = ()=>{
    let finalPass = '';
    let charSet = '';
    if(uppercase || lowercase || numbers || symbols){
        if(uppercase) charSet += UC;
        if(lowercase) charSet +=LC;
        if(numbers) charSet += NC;
        if(symbols) charSet += SC;
        for (let i = 0; i < passwordLen; i++) {
          finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length))
        }
    
        setShowFinalPwd(finalPass)
    }
    
    else{
      toast.error("Please one CheckBox!.......")
    }
  }

  let copyPass = ()=>{
    // This is built in object in javascript work for copied text
    navigator.clipboard.writeText(showFinalPwd)
    toast.success("Copied text....")
  }

  return (
    <>
    <ToastContainer />
      <div className='passwordBox'>
        <h2>Password Generator</h2>

        <div className='passwordBoxIn'>
          <input type='text' readOnly value={showFinalPwd} /> <button onClick={copyPass}>Copy</button>
        </div>

        <div className='passlength'>
          <label className='color-white'>Password Length</label>
          <input type='number' value={passwordLen} min={10} max={20} onChange={(event)=>setPasswordLen(event.target.value)}/>
        </div>
        <div className='passlength'>
          <label className='color-white'>Include Uppercase Letters</label>
          <input type='checkbox' checked={uppercase} onChange={()=>setUppercase(!uppercase)}/>
        </div>
        <div className='passlength'>
          <label className='color-white'>Include Uppercase Letters</label>
          <input type='checkbox' checked={lowercase} onChange={()=>setLowercase(!lowercase)} />
        </div>
        <div className='passlength'>
          <label className='color-white'>Include Numbers</label>
          <input type='checkbox' checked={numbers} onChange={()=>setNumbers(!numbers)} />
        </div>
        <div className='passlength'>
          <label className='color-white'>Include Characters</label>
          <input type='checkbox'  checked={symbols} onChange={()=>setSymbols(!symbols)} />
        </div>
        <button className='btn' onClick={createPassword}>Generate Password</button>
      </div>
    </>
  );
}

export default App;
