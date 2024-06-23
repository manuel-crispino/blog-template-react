

const handleRegister = async (req,res) => {
 const {username,password,passwordMatch}= await req.body;
 const usernameDatabase=["user1","admin","user2"];
try{
console.log(username," ",password," ",passwordMatch);
if(username,password,passwordMatch){
if(usernameDatabase.includes(username)){
    res.json({
        success: false,
        message:"you all ready have an account try to login ",
    })
}
else if ( (password !== passwordMatch) ){
    res.json({
        success: false,
        message:"password do not match please try again",
    })
}
else{
    res.json({
        success:true,
        message:"Register successfully please confirm your email ",
    })
    }

}else{
    res.json({
        success:false,
        message:"please insert all inputs ",
    })
    }
}
catch(error){
    console.log(err.message)
}
}

export {handleRegister};