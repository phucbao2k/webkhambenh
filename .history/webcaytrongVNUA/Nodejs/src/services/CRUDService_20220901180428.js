import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data)=>{
    return new Promise((resolve, reject) =>{
        try{

        }catch(e){

        }
    })
    

}
let hashUserPassword =(password)=>{
    return new Promise( async (resolve, reject)=>{
try{
var hashPassword = await bcrypt.hashSync(password, salt);
resolve(hashPassword);
}catch(e){
    reject(e);
}
    })
}
module.exports ={
    createNewUser:createNewUser,
}