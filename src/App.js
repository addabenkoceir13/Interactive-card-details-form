import bgCardFront from './images/bg-card-front.png';
import bgCardBack from './images/bg-card-back.png';
import CardLogo from './images/card-logo.svg';
import iconComplet from './images/icon-complete.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [name, setName]       = useState('Jane Appleseed');
  const [cartNum, setCartNum] = useState('0000 0000 0000 0000');
  const [dateM, setDateM]     = useState('MM');
  const [dateY, setDateY]     = useState('YY');
  const [cvc, setCvc]         = useState('000');

  const [form, setForm] = useState(true);
  const [thanks, setThanks] = useState(false);

  const [isPading, setPading] = useState(false);

  const [errorInputN, setErrorInputN] = useState(false);
  const [errorInputC, setErrorInputC] = useState(false);
  const [errorInputM, setErrorInputM] = useState(false);
  const [errorInputY, setErrorInputY] = useState(false);
  const [errorInputV, setErrorInputV] = useState(false);
  const [formData, setFormData] = useState({
    name:    '',
    cardNum: '',
    month:   '',
    years:   '',
    cvc:     ''
  })

  const [errors, setErrors] = useState({})

  
  var p =/^\d/;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, [name] : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}
    if (!formData.name.trim())
    {
      validationErrors.name = "Name is required"
      setErrorInputN(true)
    }
    else{
      setErrorInputN(false)
    }
    if (!p.test(formData.cardNum)) {
      setErrorInputC(true)
      validationErrors.cardNum = "Wrong format, numbers only"
    }else {
      setErrorInputC(false);
    }
    
    if (!formData.cardNum === '')
    {
      setErrorInputC(true)
      validationErrors.cardNum = "Wrong format, numbers only space"
    }else {
      setErrorInputC(false);
    }
    
    if (!formData.month.trim())
    {
      setErrorInputM(true)
      validationErrors.month = "Can't be blank"
    }else{
      setErrorInputM(false)
    }
    if (!formData.years.trim())
    {
      setErrorInputY(true)
      validationErrors.years = "Can't be blank"
    }
    else{
      setErrorInputY(false);
    }
    
    if (!formData.cvc.trim())
    {
      setErrorInputV(true)
      validationErrors.cvc = "Can't be blank"
    }
    else{
      setErrorInputV(false);
    }
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setTimeout(()=>{
        setTimeout(()=>{
          setPading(false)
          setForm(false)
          setThanks(true)
        },3000)
        setPading(true)
        setForm(false)
        setThanks(false)
      },1000)
      
    }
  }
  
  return (
    <div className='App'>
      <div className="grid-container ">
        {/* Start BG cart */}
        <div className="bg-left">
          <div className="cart-front cart-info-front">
            <div className="cart-front-img">
              <img src={bgCardFront} alt="CART FRONT " />
              <img src={CardLogo} alt="card Logo" />
            </div>
            <div className="number-card">
                <h3>{cartNum}</h3>
            </div>
            <div className="info-card ">
              <h6> {name}</h6>
              <p>
                <span>{dateM}</span> / <span>{dateY}</span>
              </p>
            </div>
          </div>
          <div className="cart-back">
            <div className="cart-back-img">
              <img src={bgCardBack} alt="CART BACK " />
            </div>
            <div className="cvn-card">
              <p>{cvc}</p>
            </div>
          </div>
        </div>
        {/* Start from */}
        <div className="form-right ">
            {form && <div className="form">
              <form onSubmit={handleSubmit}>
                <input type="hidden" onChange={handleChange} />
                <label htmlFor="">Cardholder Name</label>
                <input 
                  className={errorInputN ? 'errors-input' : ''}
                  type="text" 
                  placeholder='e.g. Jane Appleseed'
                  name='name'
                  onChange={(e) => {
                    setName(e.target.value);
                    handleChange(e)
                  }}
                />
                { errors.name && <div className="errors">{errors.name}</div>}
                <label htmlFor="">Card Number</label>
                <input 
                  className={errorInputC ? 'errors-input' : ''}
                  type="text" 
                  name='cardNum'
                  placeholder='e.g. 1234 5678 9123 0000'
                  maxLength={19}
                  onChange={(e) => {
                    setCartNum(e.target.value);
                    handleChange(e)

                  }}  
                />
                { errors.cardNum && <div className="errors">{errors.cardNum}</div>}
                <div className="grid-group-input">
                  <div className="grid-date-input">
                    <label htmlFor="">Exp. Date (MM/YY)</label>
                    <input 
                      className={errorInputM ? 'errors-input' : ''}
                      type="text" 
                      placeholder='MM'
                      name='month'
                      maxLength={2}
                      onChange={(e) => {
                        setDateM(e.target.value);
                        handleChange(e)
                      }}
                      />
                    <input 
                      className={errorInputY ? 'errors-input' : ''}
                      type="text" 
                      placeholder='YY'
                      name='years'
                      maxLength={2}
                      onChange={(e) => {
                        setDateY(e.target.value);
                        handleChange(e)
                      }}
                      />
                    { errors.month && <div className="errors">{errors.month}</div>}
                    { errors.year && <div className="errors">{errors.year}</div>}
                  </div>
                  <div className="cvc">
                    <label htmlFor="">CVC</label>
                    <input 
                      className={errorInputV ? 'errors-input mt-3' : 'mt-3'}
                      type="text" 
                      name='cvc'
                      placeholder='e.g: 123'
                      maxLength={3}
                      onChange={(e) => {
                        setCvc(e.target.value);
                        handleChange(e)
                      }}
                      />
                      { errors.cvc && <div className="errors">{errors.cvc}</div>}
                  </div>
                </div>
                <div className="button">
                  <button type='submit'>Confirm</button>
                </div>
              </form>
            </div>}
            {thanks && <div className="thanks">
                <div className="icon">
                  <img src={iconComplet} alt="" />
                </div>
                <h1>Thank You !</h1>
                <p>We've added your card details</p>
                <button>Continue</button>
            </div>}
            {isPading && <div className="looder">
              <div class="custom-loader"></div>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
