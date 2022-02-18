import {FaPhoneAlt} from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";

async function logCall(numbers, username, status, name){
    const now = new Date()
    const time = now.getTime()-callTime
    const res = await fetch('http://localhost:8080/call',{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
                },
        body: JSON.stringify({destination: numbers, username: username, name: name, time: time, start: callTime, status: status}), //TODO MIGHT NEED TO BE JSON
credentials: 'include',
    })
    return res
}

async function confirm(onCall,numbers, calling){
    await onCall(numbers)
    calling()
    // onTime(now.getTime())
}

function setCallTime(){
    const now = new Date()
    callTime = now.getTime()
}
let callTime = 0


const CallButton = ({onCall, numbers, calling, showcall, endCall, username, status, name}) => {

    if(showcall){
        return (
            <button className='endcallbtn' onClick={()=>{endCall();calling();logCall(numbers, username, status, name)}}><MdCallEnd size={35} style={{cursor: 'pointer',margin: 3}}/></button>
        )
    }
    return (
        // <button className='callbtn' onClick={confirm(onCall,numbers, calling, onTime, now)}><FaPhoneAlt size={35} style={{cursor: 'pointer',margin: 3}}/></button>
        <button className='callbtn' onClick={()=>{onCall(numbers);calling();setCallTime()}}><FaPhoneAlt size={35} style={{cursor: 'pointer',margin: 3}}/></button>
    )
}

export default CallButton