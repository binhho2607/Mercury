import Number from "./Number";
import Histories from "./Histories";
import AdminHistories from "./AdminHistories";

const Admin = ({onTab, onAllHist, allHistory}) => {
    return(
        <body>

        <div className='center'>
        <div className='homebtn'>
            <Number number='' letters='History' image='history' onTab={onTab} onHist={onAllHist}/>
            <Number number='' letters='Profile' image = 'profile' onTab={onTab}/>
            <Number number='' letters='Admin' image='admin' onTab={onTab} onHist={onAllHist}/>

            <div className='center'>

                <div className='shift_down_hist_2'>
                        <AdminHistories allHistory={allHistory} />
                </div>

            </div>
        </div>



        </div>

        </body>
    )
}

export default Admin