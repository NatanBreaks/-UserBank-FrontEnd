import axios from 'axios'

 const api =  axios.create({
     baseURL: 'https://userbank-case.herokuapp.com/'
    })


 export default api