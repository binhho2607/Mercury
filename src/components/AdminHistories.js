import History from "./History";
import AdminHist from "./AdminHist";

const AdminHistories = ({allHistory}) => {
    console.log(allHistory)

    return(
        <div className='container_hist'>

            {allHistory.map((call) =>(
                <AdminHist call={call}/>
            ))}
        </div>

    )
}

export default AdminHistories