import axios from '../axios';//import để gửi dữ liệu từ client lên server
const handleLoginApi =(userEmail, userPassword)=>{
    return axios.post('/api/login',{email: userEmail, password: userPassword});
    //return mục đích để axios lấy thông tin ta muốn gửi từ phía client về server

}
const getAllUsers = (inputId)=>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
export{handleLoginApi}//đối với ReactJs, khi export function để nơi khác truy cập, 
//ta không cần export default hay module.export