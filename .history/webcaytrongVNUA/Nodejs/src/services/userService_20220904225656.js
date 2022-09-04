import db from "../models/index";
let handleUserLogin = (email, password) =>{
return new Promise(async(resolve, reject) =>{
    try{
        let userData ={};
let isExist  = await checkUserEmail(email);

if(isExist){
resolve();
}else{
userData.errCode =1;
userData.errMessage = "Your's email isn't exist in our system."
resolve(userData);
}
    }catch(e){
        reject(e);
    }
})
}
let compareUserPassword =()=>{
    return new Promise(async(resolve, reject) =>{
        try{
            
        }
    });
}
let checkUserEmail = (userEmail)=>{
    return new Promise( async(resolve, reject)=>{
        try{
let user = await db.User.find0ne({
    where:{email: userEmail}
})
if(user){
    resolve(true);
}else{
    resolve(false);
}
        }catch(e){
            reject(e);
        }
    })
}
module.exports ={
    handleUserLogin: handleUserLogin,
}