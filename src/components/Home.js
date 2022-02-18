import Number from "./Number";
import Profile from "./Profile";
import {useEffect} from "react";


const Home = ({onSettings, user, onTab, onHist, onAllHist}) =>{
    useEffect(() => { document.body.style.backgroundColor = '#ffffff' }, [])
    return (
        <body>


        <div className='center'>
        <div className='homebtn'>
            <Number number='' letters='History' image='history' onTab={onTab} onHist={onHist}/>
            <Number number='' letters='Profile' image = 'profile' onTab={onTab}/>
            <Number number='' letters='Admin' image='admin' onTab={onTab} onAllHist={onAllHist}/>
        </div>
            <div className='center'>
                <Profile onSettings={onSettings} user={user}/>
            </div>
        </div>

        </body>
    )
}

export default Home