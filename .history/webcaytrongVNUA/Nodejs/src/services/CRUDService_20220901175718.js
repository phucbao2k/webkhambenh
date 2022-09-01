import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let createNewUser = (data)=>{
console.log(data);
console.log('hehe');
}
let hashUserPasswod =(password)=>{
    return new Promise( async (resolve, reject)=>{
try{
var hash = await bcrypt.hashSync(pass, salt);
}catch(e){
    reject(e);
}
    })
}
module.exports ={
    createNewUser:createNewUser,
}