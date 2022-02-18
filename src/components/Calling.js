import OpenNumpad from "./OpenNumpad";
import EntryField from "./EntryField";
import Backspace from "./Backspace";
import Numbers from "./Numbers";
import CallButton from "./CallButton";
import Number from "./Number";
import {useEffect} from "react";



const Calling = ({numbers, makeCall, toggle, calling, status, showcall, endCall, username, name}) => {
    useEffect(() => { document.body.style.backgroundColor = '#7e1cc9' }, [])
    return(
        <div>

            <div className='center'>
                <div className='shift_down'>
                    <OpenNumpad toggle={toggle}/>
                    <EntryField numbers={numbers} noborder={true}/>
                </div>
            <div className='status'>
                <EntryField numbers={status} noborder={true} small={true}/>
            </div>
        </div>

        <div className='container'>

            <div className='numpad'>

                <Number number='' letters='Mute' call={true} image='mute'/>
                <Number number='' letters='Pause' call={true} image='pause'/>
                <Number number='' letters='Forward' call={true} image = 'forward'/>

            </div>
        </div>
        <div className='center'>
            <CallButton endCall={endCall} onCall={makeCall} numbers={numbers} calling={calling} showcall={showcall} username={username} status={status} name={name}/>

        </div>
        </div>

    )
}

export default Calling