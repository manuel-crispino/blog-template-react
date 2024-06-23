import { ChangeEvent, FormEvent, useState } from "react"


interface Props{
    postForm:()=>void;
    isAdmin:(admin:number | undefined)=>void;
    isUser:(user:number |undefined)=>void;
   
}



export default function Login (props:Props){

    const [ email,setEmail]= useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [csrfToken,setToken]=useState<string>("");
    const [isPasswordVisible,setIsVisible]=useState<boolean>(false);
    

    function handleEmail(event:ChangeEvent<HTMLInputElement>){
        const newValue=event.target.value;
        setEmail(newValue);
    }
    function handlePassword(event:ChangeEvent<HTMLInputElement>){
        const newValue=event.target.value;
        setPassword(newValue);
    }

    function handleSubmit(event:FormEvent){
event.preventDefault();
const randomToken = "superSecretRandomToken";
setToken(randomToken);
const data ={
    email:email,
    password:password,
    csrfToken:randomToken,
}
const serverData=[{
    id:0,
    email:"email@gmail.com",
    password:"password",
    csrfToken:randomToken,
    admin:false,
},{
    id:1,
    email:"admin@gmail.com",
    password:"password",
    csrfToken:randomToken,
    admin:true,
}
]
const user = serverData.find((database)=>database.email === data.email && database.password === data.password );
if (user)
{
props.postForm()
console.log("user found");
setEmail("");
setPassword("");

if (user.admin === true){
alert(" Welcome Admin ! you have successfully logged ");
const admin = serverData.find((user)=>user.admin === true);
console.log("admin successfully logged !");
if(admin){
props.isAdmin(admin.id);}
}else {
    alert(" Welcome User ! you have successfully logged ",); 
    props.isUser(user.id);   
    console.log("user successfully logged !");
}

}
else
{ 
    console.log(data ," !== " ,serverData)
    alert("should be  email = email@gmail.com  and password = password ");
    setEmail("");
setPassword("");
}
}
    return (<div className="div-form">
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
           <li> 
            <label htmlFor="showPassword" >show password</label>
           <input id="showPassword" type="checkbox" name="showPassword" aria-label="Show Password" 
            onChange={()=>setIsVisible(!isPasswordVisible)}
            />
           </li>
           <li><input type="hidden" value={csrfToken}/></li>
           <li><button type="submit">submit</button></li>
            </ul>
        </form>

    </div>)
}