import React, { useMemo, useState } from 'react'
import './App.css'

const App = () => {
  const [height, setHeight] = useState(150)
  const [weight, setWeight] = useState(70)

  function onWeightChange(event) {
    setWeight(event.target.value)
  }

  function onHeightChange(event) {
    setHeight(event.target.value)
  }

  const output = useMemo(() => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)
    
    let status = '';
    if (bmi < 18.5) {
      status = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      status = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight';
    } else {
      status = 'Obesity';
    }
    
    return {
      bmi: bmi.toFixed(2),
      status: status
    };
  }, [weight, height])

  return (
    <main>
      <div className="container">
        <header>
          <h1>BMI Calculator</h1>
          <p>Blast off your BMI experience!</p>
        </header>
        <div className="card">
          <div className='input-section'>
            <p className='slider-output'>Weight: {weight}Kg</p>
            <input className='input-slider' type='range' min='0' max='200' step='1' onChange={onWeightChange} value={weight} />
            <p className='slider-output'>Height: {height}cm</p>
            <input className='input-slider' type='range' min='0' max='250' step='1' onChange={onHeightChange} value={height} />
          </div>
          <div className='output-section'>
            <p className='output'>BMI: {output.bmi}</p>
            <p className='output'>Status: {output.status}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App