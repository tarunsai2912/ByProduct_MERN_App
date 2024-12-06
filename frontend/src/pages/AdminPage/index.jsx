import React,{useState, useEffect} from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { useNavigate } from 'react-router-dom'
import './index.css'
import axios from 'axios'
import nameImg from '../../assets/restaurant.png'
import quantityImg from '../../assets/quantity.png'
import priceImg from '../../assets/dollar.png'
import homeImg from '../../assets/home.png'
const url = 'http://localhost:3003/api'

function AdminPage() {

  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const token = sessionStorage.getItem('token')

  const handleGetOrders = async () => {
    try{
      const reqUrl = `${url}/user/get/order`
      const response = await axios.get(reqUrl, {
        headers: {
          'token': `${token}`
        }
      })
      if(response){
        setOrders(response.data)
        setLoading(false)
      }
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetOrders()
  },[])

  return (
    <div className='admin'> 
      <div className='admin-head-div'>
      <div className='admin-home' onClick={() => navigate('/')}>
        <img className='admin-home-img' src={homeImg} width='20px' height='20px' alt='home_img'></img>
        <h5 className='admin-home-para'>Home</h5>
      </div>
      <h1 className='admin-head'>Admin Dashboard</h1>
      </div>
      {loading && <ClipLoader color="#000" />}
      {!loading && orders.length === 0 && <p className='admin-para'>No Orders</p>}
      {!loading && orders.length > 0 && <div className='admin-div'> 
        {orders.map(order => (
        <div className='admin-each-div' key={order._id}> 
          <p className='admin-each-name'><img src={nameImg} alt='name_img' width='13px' height='13px'></img> Item Name: {order.name}</p> 
          <p className='admin-each-quant'><img src={quantityImg} alt='quant_img' width='15px' height='15px'></img> Quantity: {order.quantity}</p> 
          <p className='admin-each-price'><img src={priceImg} alt='price_img' width='15px' height='15px'></img> Total Price: ${order.totalPrice}</p> 
        </div>))} 
      </div>}
    </div>
  )
}

export default AdminPage
