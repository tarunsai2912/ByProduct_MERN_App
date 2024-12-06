import React, { useState } from 'react'
import './index.css'
import crossImg from '../../assets/cross.png'
import ClipLoader from "react-spinners/ClipLoader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const url = 'http://localhost:3003/api'

function CreateItem({setCreate}) {
  
  const token = sessionStorage.getItem('token')
  const [loading, setLoading] = useState(false)
  const [newItem, setNewItem] = useState({name: '', description: '', price: ''})

  const handleChange = (e) => {
    setNewItem({...newItem,
      [e.target.name]: e.target.value
    })
  }

  const handleCreate = async () => {
    try{
        setLoading(true)
        const reqUrl = `${url}/menu/create`
        const response = await axios.post(reqUrl, newItem, {
            headers: {
                'token': `${token}`
            }
        })
        if(response){
            setLoading(false)
            toast.success("Item Added")
            setCreate(false)
            window.location.reload(false)
        }
    }
    catch(err){
        setLoading(false)
        toast.error("Item Not Added")
        console.log(err)
    }
  }

  return (
    <>
    {loading && <ClipLoader color="#000" />}
    {!loading && <div className='create'>
      <ToastContainer />
      <img className='log-img-cross' src={crossImg} alt='cross_img' onClick={() => setCreate(false)}></img>
      <h1 className='create-head'>Create a New Food Item</h1>
      <div className='create-div'>
        <div className='create-name-div'>
          <h3 className='create-name-head'>Enter Item Name</h3>
          <input className='create-name-inp' type='text' value={newItem.name} name='name' onChange={handleChange} placeholder='Enter Item Name'></input>
        </div>
        <div className='create-desc-div'>
          <h3 className='create-desc-head'>Enter Item Description</h3>
          <input className='create-desc-inp' type='text' value={newItem.description} name='description' onChange={handleChange} placeholder='Enter Item Description'></input>
        </div>
        <div className='create-price-div'>
          <h3 className='create-price-head'>Enter Item Price</h3>
          <input className='create-price-inp' type='number' value={newItem.price} name='price' onChange={handleChange} placeholder='Enter Item Price in $'></input>
        </div>
      </div>
      <button className='create-btn' onClick={handleCreate}>Create Item</button>
    </div>}
    </>
  )
}

export default CreateItem
