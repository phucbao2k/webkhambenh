import axios from '../axios';//impor
const handleLoginApi =(userEmail, userPassword)=>{
    return axios.post('/api/login',{email: userEmail, password: userPassword});

}
export{handleLoginApi}