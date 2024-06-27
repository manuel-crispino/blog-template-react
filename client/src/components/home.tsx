import {useState} from "react";
import Blog from "./Blog/blog";
import Nav from "./nav/nav";
import Login from "./login/login";
import Settings from "./settings";

interface UserData {
    id : string;
    name : string;
}

export default function Home() {

    const [isAdmin,
        setIsAdmin] = useState < boolean > (false);
     const [isUser,
            setIsUser] = useState < boolean > (false);
    const [isNewPost,
        setIsNewPost] = useState < boolean > (false);
    const [adminName,
        setAdminName] = useState < string > ("");
    const [isLoginVisible,
        setIsLoginVisible] = useState < boolean > (false)
    const [isSettings,
        setSettings] = useState < boolean > (false);
    const [color,
        setColor] = useState < string > ("");
    const [userData,
        setUserData] = useState < UserData > ({id: "", name: ""});
    const [isLoginOut,setIsLoginOut]= useState<boolean>(false);

    const [id,
        setId] = useState < number > (0)
    function handleNewId() {
        const newId = id + 1;
        setId(newId);
        return id;
    }

    function handleNewPost() {
        setIsNewPost(!isNewPost);
    }


    function handleLogin() {
        setIsLoginVisible(!isLoginVisible);
      
    }

    function handleLogout() {
       
     setIsNewPost(false);
        const confirmLogout = window.confirm("Are you sure you want to logout ? ")
        if (confirmLogout) {
            setIsLoginOut(true);
            setIsAdmin(false);
            setIsUser(false);
            setUserData({id: "", name: ""});
        } else {
            return null;
        }
    }

    function handleIsUser(userId: number | undefined){
        setIsUser(true);
        if(userId !== undefined){
const currentUser = {
    id: userId.toString(),
    name: "User",
}
setUserData(currentUser);
console.log("this is the passed obj == ", currentUser);
}else{
    console.log("undefined user")
}
}

    function handleIsAdmin(adminId:number | undefined) {
     if(adminId !== undefined){

        const admin = {
            id: adminId.toString(),
            name: "Admin",
        }
        setAdminName(admin.name)
        setIsAdmin(true);
        setIsLoginOut(false);
        if ( admin){
        setUserData(admin);
        console.log("this is the passed obj == ", admin);
        }
    }
    else{
        console.log("undefined admin")
    }
    }

    function handleSettings() {
        console.log("settings");
        setSettings(!isSettings);
    }

    function handleNewColor(newColor : string) {
        setColor(newColor)
        //this make sure settings is close after the color is set //
        setSettings(false);
    }

    return (
        <div>
            <Nav
                isUser = {isUser}
                newColor={color}
                handleSettings={handleSettings}
                handleLogout={handleLogout}
                isAdmin={isAdmin}
                handleLogin={handleLogin}
                onClick={handleNewPost}
                />
            <Settings
                closeSettings={handleSettings}
                newColor={(newColor : string) => handleNewColor(newColor)}
                isClicked={isSettings}/> 
                {isLoginVisible?
                 (<Login closeLoginForm={()=>setIsLoginVisible(!isLoginVisible)} isUser={(userId)=>handleIsUser(userId)} isAdmin={(adminId)=>handleIsAdmin(adminId)} postForm={handleLogin}/>)
                : ("")
                }
            <Blog
                isLoginOutWhileUpdating={isLoginOut}
                isUser={isUser}
                getUserData={userData}
                isAdmin={isAdmin}
                authorName={adminName}
                changeValue={handleNewPost}
                isNewPost={isNewPost}
                generateId={handleNewId}/>

        </div>
    )
}