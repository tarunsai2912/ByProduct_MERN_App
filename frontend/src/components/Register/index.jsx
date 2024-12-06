import React, {useState} from 'react'
import { UserRegister } from '../../apis/user'
import crossImg from '../../assets/cross.png'
import eyeImg from '../../assets/open_eye.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import ClipLoader from "react-spinners/ClipLoader";

function Register({setRegisterOpen, setLoginOpen}) {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [wrong, setWrong] = useState(false)

  const handleClick = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Invalid UserName'
    } 
    if (!formData.email) {
      newErrors.email = 'Give an Email'
    } 
    else if (!/\S+@\S+\.\S{3,}/.test(formData.email)) {
      newErrors.email = 'Invalid Email'
    }
    if (!formData.password) {
      newErrors.password = 'Weak password'
    } 
    else if (formData.password.length < 6) {
      newErrors.password = 'Weak password'
    }
    return newErrors;
  }

  const handleSubmit = async () => {
    const formErrors = validate();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        if(errors.name){
          setFormData({...formData,
            name: ''
          })
        }
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
        return;
      }
    
    setLoading(true)
    const response = await UserRegister({...formData})
      
    if (response) {
      setLoading(false)
      toast.success("User got Registered Successfully!")
      setRegisterOpen(false)
      setWrong(false)
      setLoginOpen(true)
    }
    else{
      setWrong(true)
      setFormData({
        name: '',
        password: ''
      })
      setLoading(false)
      toast.error("User not registered")
    }
  }

  return (
    <>
    <ToastContainer />
     {!loading ? <div className='reg-container'>
        <div className='reg-container-cross'>
          <img className='reg-img-cross' src={crossImg} alt='cross_img' onClick={() => setRegisterOpen(false)}></img>
        </div>
        <h3 className='reg-container-head'>Register</h3>
        <div className='name-div-reg'>
          <p className='name-para-reg'>Username</p>
          <input type='text' name='name' className='name-input-reg' value={errors.name ? '' : formData.name} onChange={handleChange} style={{border: errors.name ? '2px solid #D60000' : '2px solid #F4F4F4'}} placeholder='Enter username'></input>
        </div>
        {errors.name && <span className='name-err-reg' style={{ color: 'red' }}>{errors.name}</span>}
        <div className='email-div-reg'>
          <p className='email-para-reg'>Email</p>
          <input type='email' name='email' className='email-input-reg' value={errors.email ? '' : formData.email} onChange={handleChange} style={{border: errors.email ? '2px solid #D60000' : '2px solid #F4F4F4'}} placeholder='Enter email'></input>
        </div>
        {errors.email && <span className='email-err-reg' style={{ color: 'red' }}>{errors.email}</span>}
        <div className='pass-div-reg'>
          <p className='pass-para-reg'>Password</p>
          <input type={showPassword ? "text" : "password"} name='password' className='pass-input-reg' value={errors.password ? '' : formData.password} onChange={handleChange} style={{border: errors.password ? '2px solid #D60000' : '2px solid #F4F4F4'}} placeholder='Enter password'></input>
          <img className='eye-img-reg' src={eyeImg} alt='eye_img' onClick={handleClick}></img>
        </div>
        {errors.password && <span className='pass-err-reg' style={{ color: 'red' }}>{errors.password}</span>}
        {wrong && <p className='err-reg' style={{color: 'red'}}>User Already got Registered</p>}
        <button onClick={handleSubmit} className='signup-btn-reg'>Register</button>
      </div> : <div style={{position: 'relative', left:'40vw', bottom: '50vh'}}><ClipLoader color={"#36D7B7"} loading={loading} size={100} /></div>}
    </>
  )
}

export default Register
