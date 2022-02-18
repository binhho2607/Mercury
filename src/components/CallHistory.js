import Number from "./Number";
import Profile from "./Profile";
import History from "./History";
import Histories from "./Histories";





const CallHistory = ({onTab, history,onHist, onAllHist}) => {
    return(
        <body>

        <div className='center'>
        <div className='homebtn'>
            <Number number='' letters='History' image='history' onTab={onTab} onHist={onHist}/>
            <Number number='' letters='Profile' image = 'profile' onTab={onTab}/>
            <Number number='' letters='Admin' image='admin' onTab={onTab} onAllHist={onAllHist}/>

            <div className='center'>

                <div className='shift_down_hist'>
                        <Histories history={history} />

                </div>

            </div>
        </div>



        </div>

        </body>
    )
}

export default CallHistory