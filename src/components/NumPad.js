import OpenNumpad from "./OpenNumpad";
import EntryField from "./EntryField";
import Backspace from "./Backspace";
import Numbers from "./Numbers";
import CallButton from "./CallButton";
import {useEffect} from "react";

const NumPad = ({numbers, backspaceNum, addNum, makeCall, toggle, calling, onTime, callTime}) => {
    useEffect(() => { document.body.style.backgroundColor = '#7e1cc9' }, [])
    return(
        <div className='purplebg' style={{backgroundColor: '#7e1cc9'}}>
            <div className='center'>
                <Backspace onBack={backspaceNum}/>
            </div>
            <div className='center'>
            <OpenNumpad toggle={toggle}/>
            <EntryField numbers={numbers}/>

        </div>


        <div className='container'>
            <Numbers onAdd={addNum}/>
        </div>
        <div className='center'>
            <CallButton onCall={makeCall} numbers={numbers} calling={calling} onTime={onTime} callTime={callTime}/>

        </div>
        </div>

    )
}

export default NumPad