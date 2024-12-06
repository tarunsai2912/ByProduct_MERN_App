const User = require('../model/user')
const Menu = require('../model/menu')

const createMenu = async (req, res, next) => {
    try{
        const {name, description, price} = req.body

        const user = await User.findById(req.user_Id)
        if(!user){
            return res.status(400).json({msg: 'User Not Found'})
        }

        const newItem = new Menu({name, description, price, createdBy: user._id})
        const newMenuItem =  await newItem.save()

        user.menuItemId.push(newMenuItem._id)
        await user.save()
        return res.status(200).json({msg: 'Item Added Successfully', newMenuItem}) 
    }
    catch(err){
        return next(err)
    }
}

const getAllMenuItems = async (req, res, next) => {
    try{
        const menuItems = await Menu.find()
        return res.status(200).json(menuItems) 
    }
    catch(err){
        return next(err)
    }
}

module.exports = {createMenu, getAllMenuItems}