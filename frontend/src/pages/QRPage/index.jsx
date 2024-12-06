import React from 'react'
import './index.css'
import { QRCodeSVG } from 'qrcode.react'

const url = 'http://localhost:3000/menu'

function QRPage() {
  return (
    <div>
      <h1>Scan to View Menu</h1>
      <QRCodeSVG value={url} />
    </div>
  )
}

export default QRPage
