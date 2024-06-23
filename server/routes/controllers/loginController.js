


const handleLogin = async (req, res) => {
    // Leggi i dati inviati da React dal corpo della richiesta
   const { username, password,csrfToken } = await req.body;
try{
    // Ora puoi fare il console log dei dati ricevuti
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("token:", csrfToken);
    const userExist = await checkUserCredentials(username,password);
if(userExist){
res.json({
    admin:username,
    success:true,
    message: "you have successfully logged in "
});
res.end();
}else{
    res.json({
        success:false,
        message: "username or password incorrect "
    });
    res.end();
}
}catch(error){
    console.log(error.message);
    res.end();
}
};

async function checkUserCredentials(username,password){
   return username === 'manuel' && password === 'a';
};

export { handleLogin};