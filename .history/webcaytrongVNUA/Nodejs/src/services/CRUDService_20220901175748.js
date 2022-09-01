import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let createNewUser = (data)=>{
console.log(data);
console.log('hehe');
}
let hashUserPasswod =(password)=>{
    return new Promise( async (resolve, reject)=>{
try{
var hashPassword = await bcrypt.hashSync(password, salt);
re
}catch(e){
    reject(e);
}
    })
}
module.exports ={
    createNewUser:createNewUser,
}