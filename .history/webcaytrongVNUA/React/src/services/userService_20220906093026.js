import axios from '../axios';//import để gửi dữ liệu từ client 
const handleLoginApi =(userEmail, userPassword)=>{
    return axios.post('/api/login',{email: userEmail, password: userPassword});

}
export{handleLoginApi}