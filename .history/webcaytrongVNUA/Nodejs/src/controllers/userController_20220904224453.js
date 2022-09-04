import userService
let handleLogin = (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters!'
        })
    }
return res.status(200).json({
    message: 'hello world',
    yourEmail: email,
    errCode:0,
})
}
module.exports ={
    handleLogin:handleLogin
}