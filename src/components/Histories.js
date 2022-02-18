import History from "./History";

const Histories = ({history}) => {

    console.log(history)

    return(
        <div className='container_hist'>

            {history.map((call) =>(
                <History call={call}/>
            ))}
        </div>

    )
}

export default Histories