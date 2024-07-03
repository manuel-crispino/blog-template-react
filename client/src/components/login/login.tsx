import { ChangeEvent, FormEvent, useState } from "react"


interface Props{
    postForm:()=>void;
    isAdmin:(admin:number | undefined)=>void;
    isUser:(user:number |undefined)=>void;
    closeLoginForm:()=>void;
   
}

interface ServerData {
    id:number;
    email: string;
    role:string;
    success: boolean ;

}



export default function Login (props:Props){

    const [ email,setEmail]= useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [csrfToken,setToken]=useState<string>("");
    const [isPasswordVisible,setIsVisible]=useState<boolean>(false);
    const [serverData,setServerData] =useState<ServerData | null>()
    

    function handleEmail(event:ChangeEvent<HTMLInputElement>){
        const newValue=event.target.value;
        setEmail(newValue);
    }
    function handlePassword(event:ChangeEvent<HTMLInputElement>){
        const newValue=event.target.value;
        setPassword(newValue);
    }


    async function handleSubmit(event:FormEvent){
    event.preventDefault();

   try {
    
    const response = await fetch("/csrfToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if (response.ok) {
        const data = await response.json();
        setToken(data);
    } else {
        setToken("FrontEndTrial");
        console.error("Failed to fetch CSRF token");
    };


const data ={
    email:email,
    password:password,
    csrfToken:csrfToken,
}
const loginResponse= await fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
  body:JSON.stringify(data),
});

if (loginResponse.ok) {
    const data = await loginResponse.json();
    setServerData({ 
        id:data.id,
        email: data.email,
        role: data.role ,
        success: data.success,

     })
} else {
    // Here start the code of block to delete or comment when using in production or testing the server // 
      // Only use in front developer mode cancel when production //
    const arrayUsers =  [{ 
        id: 1,
        email: "admin@gmail.com",
        password: "password",
        role: "admin",
        success: true ,

     },{ 
        id: 2,
        email: "email@gmail.com",
        password:"password",
        role: "user",
        success: true ,

     }];
  
   const currentUser =  arrayUsers.find((user)=> user.email === data.email && user.password === data.password);
   if (currentUser){
    setServerData({ 
        id: currentUser.id,
        email: currentUser.email,
        role: currentUser.role,
        success: currentUser.success ,

     },
    );
        //  Attention !!!!!//
        // until here you should cover or delete the block of code above when in production or testing server //  
}else if (!currentUser){
        alert("users not found try again!")
        console.error("Failed to fetch user !");
    }
    else{
        const error = new Error();
        console.log(error);
    }
   
};


if (serverData)
{
props.postForm()
setEmail("");
setPassword("");

if (serverData.role === "admin" ){
const admin = serverData;
if(admin){
    alert(" Welcome Admin ! you have successfully logged "); 
props.isAdmin(admin.id);}
}else {
    alert(" Welcome user ! you have successfully logged "); 
    props.isUser(serverData.id);   
    
}

}
else
{ 
    console.log(data ," !== " ,serverData)
    alert("email or password incorrect  ");
    setEmail("");
setPassword("");
}}catch(error){
    console.log(error);
}
}


    return (
        <div className=" overlay">
    <div className="login-form">
        <button type="button" title="exit" className="float-right-cross" onClick={()=>props.closeLoginForm()}>X</button>
        <form id="login-form" action="post" onSubmit={handleSubmit}>
            <ul id="ul-no-style">
                <li><h2>Login</h2></li>
            <li>
            <input  id="email-input" type="email" onChange={handleEmail} placeholder="email@gmail.com" value={email}/></li>
           <li>
            <input 
           
            id="password-input"
            type={isPasswordVisible? "text":"password"} 
            onChange={handlePassword} placeholder="password" autoComplete="current-password" value={password} /> 
            </li>
           <li className="margin-top-1"> 
            <label htmlFor="showPassword" >show password</label>
           <input id="showPassword" type="checkbox" name="showPassword" aria-label="Show Password" 
            onChange={()=>setIsVisible(!isPasswordVisible)}
            />
           </li>
           <li><input type="hidden" value={csrfToken}/></li>
           <li><button className="margin-top-2" type="submit">submit</button></li>
            </ul>
        </form>
        <br />
        

    </div>
    </div>)
}