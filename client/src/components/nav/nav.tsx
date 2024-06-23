import {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BloggerIcon from '../../assets/Group2.svg';
interface Props {
    onClick : () => void;
    handleLogin : () => void;
    handleLogout : () => void;
    handleSettings : () => void;
    isAdmin : boolean;
    isUser:boolean;
    newColor : string;
}

export default function Nav(props : Props) {

    const [isClicked,
        setIsClicked] = useState < boolean > (false);

    function handleUserSettings() {
        //this function make the arrow up or down and show or hide the list //
        console.log("clicked")
        setIsClicked(!isClicked);
    }
    return (

        <nav
            style={{
            backgroundColor: props.newColor
                ? props.newColor
                : "rgb(44, 145, 246)"
        }}>
            <ul className="ul-nav">
                <li><img src={BloggerIcon} className="img-logo " alt="Logo"/></li>
                {props.isAdmin
                    ? (
                        <li className="float-right">
                            <button
                                className="nav-btn"
                                title="Admin"
                                type="button"
                                onClick={handleUserSettings}>{< PersonIcon />} {isClicked
                                    ? (<ArrowDropUpIcon/>)
                                    : (<ArrowDropDownIcon/>)}
                            </button>
                            {isClicked
                                ? (
                                    <ul
                                        onMouseLeave={handleUserSettings}
                                        style={{
                                        backgroundColor: props.newColor
                                            ? props.newColor
                                            : "rgb(44, 145, 246)"
                                    }}
                                        className="ul-popup">
                                        <li className="float-right">
                                            <button
                                                className="nav-btn"
                                                title="Create a new post"
                                                type="button"
                                                onClick={() => props.onClick()}>New post</button>
                                        </li>
                                        <li>
                                            <button className="nav-btn" type="button">Dashboard</button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                handleUserSettings();
                                                props.handleSettings();
                                            }}
                                                className="nav-btn"
                                                type="button">Settings</button>
                                        </li>
                                    </ul>
                                )
                                : ("")
}
                        </li>
                    )
                    : ("")
}
                {props.isAdmin  || props.isUser
                    ? (
                        <li className="float-right">
                            <button
                                className="nav-btn"
                                title="Logout"
                                type="button"
                                onClick={() => props.handleLogout()}>Logout</button>
                        </li>
                    )
                    : (
                        <li className="float-right">
                            <button
                                className="nav-btn"
                                title="Login"
                                type="button"
                                onClick={() => props.handleLogin()}>Login</button>
                        </li>
                    )
}
</ul>
        </nav>

    )
}