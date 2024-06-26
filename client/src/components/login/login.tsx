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
        console.log(data); // Do something with the data
        setToken(data)
    } else {
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
    console.log(data); // Do something with the data
    setServerData({ 
        id:data.id,
        email: data.email,
        role: data.role ,
        success: data.success,

     })
} else {
    console.error("Failed to fetch user !");
};


if (serverData)
{
props.postForm()
console.log("user found");
setEmail("");
setPassword("");

if (serverData.role === "admin" ){
const admin = serverData;
console.log("admin successfully logged !");
if(admin){
    alert(" Welcome Admin ! you have successfully logged ",); 
props.isAdmin(admin.id);}
}else {
    alert(" Welcome user ! you have successfully logged ",); 
    props.isUser(serverData.id);   
    console.log("user successfully logged !");
}

}
else
{ 
    console.log(data ," !== " ,serverData)
    alert("should be  email = email@gmail.com  and password = password ");
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

    </div>
    </div>)
}