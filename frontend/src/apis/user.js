import axios from 'axios'
const url = 'http://localhost:3003/api'

export const UserLogin = async ({email, password}) => {
    try{
        const reqUrl = `${url}/user/login`
        const response = await axios.post(reqUrl, {email, password})
        return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const UserRegister = async ({name, email, password}) => {
    try{
        const reqUrl  = `${url}/user/register`
        const response = await axios.post(reqUrl, {name, email, password})
        return response.data
    }
    catch(err){
        console.log(err);
    }
}