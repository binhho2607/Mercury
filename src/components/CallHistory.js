import Number from "./Number";
import Profile from "./Profile";

const History = ({onTab, history}) => {
    return(
        <body>


        <div className='center'>
        <div className='homebtn'>
            <Number number='' letters='History' image='history' onTab={onTab}/>
            <Number number='' letters='Profile' image = 'profile'/>
            <Number number='' letters='Admin' image='admin'/>
        </div>
            {history.map((call) =>{
                
            })}
        </div>

        </body>
    )
}

export default History