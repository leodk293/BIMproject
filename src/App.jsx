import './App.css';
import { useState, useRef } from 'react';

import healthy from "../assets/healthy.png"
import overweight from '../assets/overweight.png'
import underweight from '../assets/underweight.png'



function App() {
  const heightRef = useRef();
  const weightRef = useRef();
  const [bim, setBim] = useState(null);

  let calculatedBim;

  function showResult() {
    const height = parseFloat(heightRef.current.value);
    const weight = parseFloat(weightRef.current.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      weightRef.current.classList.add('error');
      heightRef.current.classList.add('error');

    } else {
      weightRef.current.classList.remove('error');
      heightRef.current.classList.remove('error');
      calculatedBim = weight / (height * height);
      setBim(calculatedBim.toFixed(2));
    }

  }


  const style_good_health = {
    color : "green",
    fontSize : "20px",
    fontWeight : "bolder"

    
  }

  const style_bad_health = {
    color : "crimson",
    fontSize : "20px",
    fontWeight : "bolder"
    
  }


  function reload() {
    weightRef.current.value = null;
    heightRef.current.value = null;
    setBim(null)

  }

  return (
    <>
      <div className="containerApp">
        <h1>BMI Calculator</h1>

        <form onSubmit={(event) => event.preventDefault()} action="" noValidate>
          <label htmlFor="weight">Weight (in kg) : </label>
          <input id="weight" ref={weightRef} type="number" placeholder="Enter Your Weight..." />
          <label htmlFor="height">Height in (meters) : </label>
          <input id="height" ref={heightRef} type="number" placeholder="Enter Your Height..." formNoValidate />

          <button onClick={showResult} className="submit">
            Submit
          </button>
          <button onClick={reload}>Reload</button>
        </form>

        {bim !== null && <p className='bim'>Your BMI is : <span className='bold'>{bim}</span></p>}

        {(bim !== null && bim < 18.5) && <img src={underweight} alt='people underweight' />}
        {(bim >= 18.5 && bim <= 24.9) && <img src={healthy} alt='people healthy' />}
        {bim > 24.9 && <img src={overweight} alt='people overweight'/>}

        {(bim !== null && bim < 18.5) && <p style={style_bad_health}>You are undernourished ❌</p>}
        {(bim >= 18.5 && bim <= 24.9) && <p style={style_good_health}>You are in good health ✅</p>}
        {bim > 24.9 && <p style={style_bad_health}>You are overeating ❌</p>}



      </div>
    </>
  );
}

export default App;
