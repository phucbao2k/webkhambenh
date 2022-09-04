let handleLogin = (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs para'
        })
    }
return res.status(200).json({
    message: 'hello world',
    yourEmail: email,
})
}
module.exports ={
    handleLogin:handleLogin
}