const User = require('../model/user')
const Menu = require('../model/menu')
const Order = require('../model/order')

const placeOrder = async (req, res, next) => {
    try{
        const {menuItemId} = req.params 
        const {quantity, totalPrice} = req.body

        const user = await User.findById(req.user_Id)
        if(!user){
            return res.status(400).json({msg: 'User Not Found'})
        }

        const menuItem = await Menu.findById(menuItemId)
        if(!menuItem){
            return res.status(400).json({msg: 'Item Not Found'})
        }

        const order = new Order({name: menuItem.name, quantity, totalPrice, menuItemId: menuItem._id})
        const newOrder = await order.save()

        user.orderItemId.push(newOrder._id)
        await user.save()
        return res.status(200).json({msg: 'Order Successfully Placed', newOrder}) 
    }
    catch(err){
        return next(err)
    }
}

module.exports = {placeOrder}