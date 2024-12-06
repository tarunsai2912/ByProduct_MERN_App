import React from 'react'
import './index.css'
import { QRCodeSVG } from 'qrcode.react'

const url = 'https://by-product-mern-app.vercel.app/'

function QRPage() {
  return (
    <div className='qr'>
      <h1 className='qr-head'>Scan to View Menu</h1>
      <QRCodeSVG value={url} />
    </div>
  )
}

export default QRPage
