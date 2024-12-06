import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import ClipLoader from "react-spinners/ClipLoader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../components/Login'
import foodImg from '../../assets/foodMenu.jpg'
import CreateItem from '../../components/CreateItem';
import Register from '../../components/Register'
import axios from 'axios'
import './index.css'

const url = 'https://by-product-mern-app-backend.vercel.app/api'

function MenuPage({isCreate, setCreate, isLoginOpen, setLoginOpen, isRegisterOpen, setRegisterOpen}) {

  const token = sessionStorage.getItem('token')
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  const toggleRegister = () => {
    setLoginOpen(false)
    setRegisterOpen(true)
  }

  const toggleLogin = () => {
    setRegisterOpen(false)
    setLoginOpen(true)
  }

  const getAllMenuItems = async () => {
    try{
      const reqUrl = `${url}/menu/all`
      const response = await axios.get(reqUrl)
      if(response){
        setMenuItems(response.data)
        setLoading(false)
      }
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  const placeOrder = async (menuItemId) => { 
    if(!token){
      toast.error('Please Login')
    }
    const order = {
      quantity: 1, 
      totalPrice: menuItems.find(item => item._id === menuItemId).price
    }
    const reqUrl = `${url}/order/place/${menuItemId}`
    const response = await axios.post(reqUrl, order, {
      headers: {
        'token': `${token}`
      }
    })
    if(response){
      toast.success('Order placed')
    }
  }

  useEffect(() => {
    getAllMenuItems()
  }, [])

  return (
    <div className='menu'>
      <ToastContainer />
      <NavBar toggleRegister={toggleRegister} toggleLogin={toggleLogin} isRegisterOpen={isRegisterOpen} isLoginOpen={isLoginOpen} setCreate={setCreate} isCreate={isCreate} />
      <div className='menu-div' style={{opacity: isLoginOpen || isRegisterOpen || isCreate ? '0.1' : '1'}}> 
        <h1 className='menu-head'>Menu</h1> 
        {loading && <ClipLoader color="#000" />}
        {!loading && menuItems.length === 0 && <p className='menu-para'>Please Add Food Items</p>}
        {!loading && menuItems.length > 0 && <div className='menu-all-div'>
        {menuItems.map(item => ( 
          <div className='menu-each-div' key={item._id}> 
            <img className='menu-each-pic' src={foodImg} alt='food_img'></img>
            <div className='menu-para-div'>
              <h2 className='menu-each-name'>{item.name}</h2> 
              <p className='menu-each-desc'>{item.description}</p> 
              <p className='menu-each-price'>${item.price}</p> 
              <button className='menu-each-btn' onClick={() => placeOrder(item._id)}>Order</button> 
            </div>
          </div>))} 
        </div>}
      </div>
      {isRegisterOpen && <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />}
      {isLoginOpen && <Login setLoginOpen={setLoginOpen} />}
      {isCreate && <CreateItem setCreate={setCreate} />}
    </div>
  )
}

export default MenuPage
