import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bookmarkImg from '../../assets/bookmark1.png'
import profileImg from '../../assets/profile.png'
import navbarImg from '../../assets/navbar.png'
import './index.css'

function NavBar({toggleRegister, toggleLogin, isRegisterOpen, isLoginOpen, setCreate, isCreate}) {

  const navigate = useNavigate()
  const authToken = sessionStorage.getItem('token')
  const userId = sessionStorage.getItem('userId')
  const username = sessionStorage.getItem('name')
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
    window.location.reload(false);
  }

  return (
    <div className='nav1-container' style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate ? '#000000CF' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate ? '0.1' : '1'}}>
      <h3 className='nav-head'>QR Code Menu System</h3>
      {authToken && userId ?
      <>
        <div className='log-d1-nav'>
          <button className='book-btn-nav' onClick={() => navigate('/admin')}>Admin Panel</button>
          <button className='add-btn-nav' onClick={() => setCreate(true)}>Add Menu Item</button>
          <img className='prof-img-nav' src={profileImg} alt='profile_img'></img>
          <img className='bar-img-nav' src={navbarImg} alt='navbar_img' onClick={() => setOpen(!open)}></img>
        </div>
        {open && <div className='log-d2-nav'>
          <h4 className='name-para-nav'>{username}</h4>
          <button className='logout-btn-nav' onClick={handleLogout}>Logout</button>
        </div>}
      </> : 
      <div className='nav2-container'>
        <button className='reg-btn-nav' onClick={toggleRegister}>Register Now</button>
        <button className='sign-btn-nav' onClick={toggleLogin}>Sign In</button>
      </div>
      }
    </div>
  )
}

export default NavBar
