import userService from "../services/userService";
let handleLogin = async (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
return res.status(200).json({
   errCode: userData.errCode,
   message: userData.errMessage,
   user:userData.user ? userData.user: {
    
   }
})
}
let handleGetAllUsers = async(req,res)=>{
    let id = req.body.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json
}
module.exports ={
    handleLogin:handleLogin
}