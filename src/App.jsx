import { use, useState } from 'react'

import './App.css'
import dice from '/src/assets/icon-dice.svg'
import divider1 from '/src/assets/pattern-divider-desktop.svg'
import divider2 from '/src/assets/icon-dice.svg'
function App() {

    const [advice,setadvice]=useState('Press the dice to get your advice')
    const [id,setid]=useState(0);
    const [lod,setlod]=useState("");
   async function fetchAdvice() {
    setlod("loding...")
    try {
       const response = await fetch('https://api.adviceslip.com/advice');
        
        // تحقق من حالة الاستجابة
        const data = await response.json();
       
        if (data.slip.id==id) {
          fetchAdvice()
        }
        setadvice(data.slip.advice)
        setid(data.slip.id)
       
    } catch (error) {
        console.error('Error fetching advice:', error);
    }
    setlod("")
}


  return (
    <div className='app'>
      <div className='card'>
        <p>ADVICE #{id}</p>
        <h2>"{lod==""? advice : lod} "</h2>
        <img className='line' src={divider1} alt="" />
        <button onClick={fetchAdvice}>
          <img src={dice} alt="" />
        </button>
      </div>
    </div>
  )
}

export default App
