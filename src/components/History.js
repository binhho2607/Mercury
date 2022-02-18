
const History = ({call, status}) => {
    const seconds = Math.floor(call.time/1000)
    const minutes = Math.floor(seconds/60)
    const remainder = minutes*60-seconds
    let color = ''
    if(call.status === 'Call Unavailable'){
        color = '#E3E500'
    }else if(call.status === 'Call Failed'){
        color = 'red'
    }else{
        color = 'green'
    }

    return(
        <div className='history' style={{borderLeft: `5px solid ${color}`}}>

            <h3>{call.name}</h3> <h3 style={{fontWeight: 'normal'}}>called to</h3> <h3>{call.destination}</h3>
                <h4>Duration: {minutes} minutes {seconds} seconds </h4>
                <h4>Status: {call.status}</h4>


        </div>
    )
}

export default History