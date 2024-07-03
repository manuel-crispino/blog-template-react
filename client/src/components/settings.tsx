import {ChangeEvent, FormEvent, useState} from 'react';

interface Props{
    isClicked:boolean ;
    newColor:(inputColor:string)=>void;
    closeSettings:()=>void;
}



export default function Settings (props:Props){

    const [inputColor,setInputColor] = useState<string>("");

    function handleInputColor(event:ChangeEvent<HTMLInputElement>){
        const newValue = event.target.value;
        setInputColor(newValue);
    }

    function handleNavChange (event:FormEvent){
event.preventDefault();
console.log('this is the new color ', inputColor );
props.newColor(inputColor);
    }

    return (
<div >
{props.isClicked?
(
<div className='div-settings-light '>
    <button type='button' onClick={props.closeSettings} className='red float-right-cross'>X</button>
        <h2>Choose your nav color </h2>
        <form id='settings-form' action="post" onSubmit={handleNavChange}>
    <ul className='ul-nav '>
        <li><h3>Must contain # !</h3></li>
        <li><label htmlFor="new-color-input">Paste your color here :  </label></li>
      <li>
        <input 
        id='new-color-input'
         type="text" name='new-color' 
         value={inputColor} onChange={handleInputColor}  
         placeholder='example: #219C90 '/>
         </li>
            <li>
               
            <button className='nav-btn' title={inputColor} type='button'>
                <div style={{width:"20px", height:"20px", backgroundColor: inputColor?inputColor:"rgb(44, 145, 246)"}}></div>
            </button>
            </li>
            <li><a  rel="noopener noreferrer"  target="_blank"  href="https://colorhunt.co/">Here you can find colors to copy </a></li>
</ul>
<button type='submit'>Save change</button>
</form>
</div>
) 
:("")
}
</div>
    )
}