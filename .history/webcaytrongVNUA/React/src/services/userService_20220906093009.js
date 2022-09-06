import axios from '../axios';//gu
const handleLoginApi =(userEmail, userPassword)=>{
    return axios.post('/api/login',{email: userEmail, password: userPassword});

}
export{handleLoginApi}