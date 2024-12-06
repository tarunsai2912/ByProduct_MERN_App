const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    menuItemId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MenuItem' 
    }
})

module.exports = mongoose.model('OrderItem', OrderItemSchema)