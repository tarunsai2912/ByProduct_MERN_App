import React, {useState} from 'react'
import { UserLogin } from '../../apis/user'
import crossImg from '../../assets/cross.png'
import eyeImg from '../../assets/open_eye.png'
import './index.css'
import ClipLoader from "react-spinners/ClipLoader"

function Login({setLoginOpen}) {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [wrong, setWrong] = useState(false)

  const handleClick = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Give a valid Email'
    } 
    else if (!/\S+@\S+\.\S{3,}/.test(formData.email)) {
      newErrors.email = 'Invalid Email'
    }
    if (formData.password.length < 2) {
      newErrors.password = 'Invalid password'
    }
    return newErrors
  }

  const handleSubmit = async () => {
    const formErrors = validate()
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors)
        if(errors.email){
          setFormData({...formData,
            email: ''
          })
        }
        if(errors.password){
          setFormData({...formData,
            password: ''
          })
        }
        return 
      }
    
    setLoading(true)
    const response = await UserLogin({...formData})
      
    if (response) {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('userId', response.user_Id);
      sessionStorage.setItem('name', response.name);
      setLoading(false)
      setWrong(false)
      setLoginOpen(false)
      window.location.reload(false);
    }
    else{
      setWrong(true)
      setFormData({
        email: '',
        password: ''
      })
      setLoading(false)
    }
  }

  return (
    <>
    {!loading ? <div className='log-container'>
      <div className='log-container-cross'>
        <img className='log-img-cross' src={crossImg} alt='cross_img' onClick={() => setLoginOpen(false)}></img>
      </div>
      <h3 className='log-container-head'>Login</h3>
      <div className='name-div-log'>
        <p className='name-para-log'>Email</p>
        <input type='email' name='email' value={errors.email ? '' : formData.email} className='name-input-log' onChange={handleChange} style={{border: errors.email ? '2px solid #D60000' : '2px solid #F4F4F4'}} placeholder='Enter email' ></input>
      </div>
      {errors.email && <span className='name-err-log' style={{ color: 'red' }}>{errors.email}</span>}
      <div className='pass-div-log'>
        <p className='pass-para-log'>Password</p>
        <input type={showPassword ? "text" : "password"} name='password' value={errors.password ? '' : formData.password} className='pass-input-log' onChange={handleChange} style={{border: errors.password ? '2px solid #D60000' : '2px solid #F4F4F4'}} placeholder='Enter password' ></input>
        <img className='eye-img-log' onClick={handleClick} src={eyeImg} alt='eye_img'></img>
      </div>
      {errors.password && <span className='pass-err-log' style={{ color: 'red' }}>{errors.password}</span>}
      {wrong && <p className='err-log' style={{color: 'red'}}>Please enter valid username</p>}
      <button onClick={handleSubmit} className='login-btn-log'>Login</button>
    </div> : <div style={{position: 'relative', left:'40vw', bottom: '50vh'}}><ClipLoader color={"#36D7B7"} loading={loading} size={100} /></div>}
    </>
  )
}

export default Login
