import axios from '../axios';//import để gửi dữ liệu từ c
const handleLoginApi =(userEmail, userPassword)=>{
    return axios.post('/api/login',{email: userEmail, password: userPassword});

}
export{handleLoginApi}