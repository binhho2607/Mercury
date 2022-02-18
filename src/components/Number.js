import { BsFillMicMuteFill, BsFillMicFill, BsPause, BsPlay, BsTelephoneForward, BsClockHistory} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

import { RiAdminLine } from "react-icons/ri";
const Number = ({number, letters, onAdd, call, image, onTab, onHist, onAllHist}) => {
    if(image === 'history'){
        return (
        <button className={'btn_home'} onClick={()=>{onTab('history');onHist=onHist()}}>{number}<BsClockHistory size={35} style={{cursor: 'pointer',margin: 3}}/><p className='letters'>{letters}</p></button>
    )
    }
    if(image === 'profile'){
        return (
        <button className={'btn_home'} onClick={()=>onTab('profile')}>{number}<CgProfile size={35} style={{cursor: 'pointer',margin: 3}}/><p className='letters'>{letters}</p></button>
    )
    }
    if(image === 'admin'){
        return (
        <button className={'btn_home'} onClick={()=>{onTab('admin');onAllHist()}}>{number}<RiAdminLine size={35} style={{cursor: 'pointer',margin: 3}}/><p className='letters'>{letters}</p></button>
    )
    }
    if(image === 'mute'){
        return (
        <button className={'btn_call'} onClick={()=>onAdd(number)}>{number}<BsFillMicMuteFill size={35} style={{cursor: 'pointer',margin: 3}}/><p className='letters'>{letters}</p></button>
    )
    }
    if(image === 'pause'){
        return (
        <button className={'btn_call'} onClick={()=>onAdd(number)}>{number}<BsPause size={35} style={{cursor: 'pointer',margin: 0}}/><p className='letters'>{letters}</p></button>
    )
    }
    if(image === 'forward'){
        return (
        <button className={'btn_call'} onClick={()=>onAdd(number)}>{number}<BsTelephoneForward size={35} style={{cursor: 'pointer',margin: 0}}/><p className='letters'>{letters}</p></button>
    )
    }
    let name = ''
    call ? name = 'btn_call' : name = 'btn'
    return (
        <button className={name} onClick={()=>onAdd(number)}>{number}<p className='letters'>{letters}</p></button>
    )
}

export default Number