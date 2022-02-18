
import './App.css';
import Numbers from './components/Numbers'
import CallButton from "./components/CallButton";
import OpenNumpad from "./components/OpenNumpad";
import EntryField from "./components/EntryField";
import {useState, useEffect} from "react"
import Backspace from "./components/Backspace";
import JsSIP from "jssip"
import * as logger from "jssip";
import NumPad from './components/NumPad'
import Calling from "./components/Calling";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/Login";
import useToken from "./components/useToken";
import CallHistory from "./components/CallHistory";
import Admin from "./components/Admin";





function App() {
  const [numbers, setNumbers] = useState('')
  const [showNumPad, setShowNumPad] = useState(true)
  const [showCalling, setShowCalling] = useState(false)
  const [callStatus, setCallStatus] = useState('')
    const [curTab, setCurTab] = useState('profile')
    const [name, setName] = useState('')
    const [uri, setURI] = useState('')
    const [password, setPassword] = useState('')
    const [socket, setSocket] = useState('')
    const [preTab, setPreTab] = useState('profile')
    const [config, setConfig] = useState({})

    const { token, setToken } = useToken();
    const [user, setUser] = useState()
    const [callTime, setCallTime] = useState(0)
    const [history, setHistory] = useState([])
    const [allHistory, setAllHistory] = useState([])

    window.onbeforeunload = async function () {
        let now = new Date()
        now = now.getTime() + 300000
        const res = await fetch('http://localhost:8080/login',{
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
            body: JSON.stringify({expire: now.toString()}),
          credentials: 'include',
      })
        return "Do you really want to close?";
    };


  const getUser = async () =>{
          const res = await fetch('http://localhost:8080/login',{
          method: 'GET',
          headers: {
              'Content-type': 'application/json'
          },
          credentials: 'include',
      })

        return res.json()
    }
    const auth = async () => {
          const res = await getUser()
        if(res){
            setUser(res)
        }


      }


    const updateHist = async () => {
      const res = await fetch('http://localhost:8080/history',{
          method: 'GET',
          headers: {
              'Content-type': 'application/json'
          },
          credentials: 'include',
      })
        const data = await res.json()
        setHistory(data)
    }

    const getAllHistory = async () => {
      console.log('hi')
      const res = await fetch('http://localhost:8080/admin',{
          method: 'GET',
          headers: {
              'Content-type': 'application/json'
          },
          credentials: 'include',
      })
        const data = await res.json()
        let final = []
        for (const [key, value] of Object.entries(data)) {
          for(let i=0;i<value.length;i++){
              final.push(value[i])
          }
        }
        console.log(final)
        setAllHistory(final)
    }

    useEffect(async ()=>{
      auth()

  },[])



  const addNum = (number) => {
      numbers.length<20 && setNumbers(numbers+number)
  }

  const backspaceNum = () => {
      numbers.length>0 && setNumbers(numbers.slice(0, numbers.length-1))
  }

  const toggleNumPad = () =>{
        setShowNumPad(!showNumPad)
      setCurTab(preTab)
  }

  const calling = () =>{
        setShowCalling(!showCalling)
  }

  const submitSettings = (name, uri, password, socket) => {

      setName(name)
        setURI(uri)
        setPassword(password)
        setSocket(socket)

      try{
          var configuration = { //TODO CHANGE URI, PASSWORD, DISPLAY NAME, ETC.
    sockets: new JsSIP.WebSocketInterface(socket),
    "display_name": name,
    "uri": uri,
    "password": password,
    "socket": {
        "uri": socket,
        "via_transport": "auto"
    },
    "registrar_server": null,
    "contact_uri": null,
    "authorization_user": null,
    "instance_id": null,
    "session_timers": false,
    "use_preloaded_route": false,
    "pcConfig": {
        "rtcpMuxPolicy": "negotiate",
        "iceServers": [
            {
                "urls": [
                    "stun:stun.l.google.com:19302"
                ]
            }
        ]
    },
    "callstats": {
        "enabled": false,
        "AppID": null,
        "AppSecret": null
    }
}
    setConfig(configuration)
    var ua = new JsSIP.UA(configuration);
          setCurTab('numpad')
      }catch{
          alert('Invalid configuration, please try changing your profile settings.')

      }
    }

  const endCall = () =>{
      var ua = new JsSIP.UA(config);
        try{
           ua.stop()
            setCallStatus('')
            console.log("Call ended")
        }catch {
            console.log("Can't stop call")
      }
  }

  const makeCall = (number) => {
    var configuration = {
    sockets: new JsSIP.WebSocketInterface(socket),
    "display_name": name,
    "uri": uri,
    "password": password,
    "socket": {
        "uri": socket,
        "via_transport": "auto"
    },
    "registrar_server": null,
    "contact_uri": null,
    "authorization_user": null,
    "instance_id": null,
    "session_timers": false,
    "use_preloaded_route": false,
    "pcConfig": {
        "rtcpMuxPolicy": "negotiate",
        "iceServers": [
            {
                "urls": [
                    "stun:stun.l.google.com:19302"
                ]
            }
        ]
    },
    "callstats": {
        "enabled": false,
        "AppID": null,
        "AppSecret": null
    }
}
    setConfig(configuration)
    var ua = new JsSIP.UA(configuration);
    ua.start();

// Register callbacks to desired call events
var eventHandlers = {
    'connecting': function(e) {
    console.log('call is connecting');
    setCallStatus('Connecting...')
  },
  'progress': function(e) {
    console.log('call is in progress');
    setCallStatus('Ringing...')
  },
  'failed': function(e) {
    console.log('call failed with cause: '+ e.cause);
    if(e.cause === 'Unavailable'){
        setCallStatus('Call Unavailable')
    }else{
        setCallStatus('Call Failed')
    }

  },
  'ended': function(e) {
    console.log('call ended with cause: '+ e.cause);
    setCallStatus('Call Ended')
  },
  'confirmed': function(e) {
    console.log('call confirmed');
    setCallStatus('Call Confirmed')
  },
  'connected': function(e) {
    console.log('Call Connected');
    setCallStatus('Call Connected')
  }
};

var options = {
  'eventHandlers'    : eventHandlers,
  'mediaConstraints' : { 'audio': true, 'video': true },
    'rtcOfferConstraints': {
                            offerToReceiveAudio: 1,
                            offerToReceiveVideo: 1}
};

var session = ua.call(number, options);










  }
  console.log(curTab)
    if(!user) {
        return <Login setToken={setToken} getUser={auth}/>
    }

    if(curTab==='profile'){
        return (
            <Router>
                <Routes>
                    <Route path='/' element={<Home onSettings={submitSettings} user={user} onTab={setCurTab} onHist={updateHist} onAllHist={getAllHistory}/>}/>
                </Routes>
            </Router>
    )
    }
    if(curTab === 'history'){
        return(
            <CallHistory history={history} onTab={setCurTab} onHist={updateHist} onAllHist={getAllHistory}/>
        )
    }
    if(curTab === 'admin'){
        return (
            <Admin onTab={setCurTab} allHistory={allHistory} onAllHist={getAllHistory}/>
        )
    }
    if(curTab === 'numpad'){
        if(showCalling){
      return(
          <Calling endCall={endCall} numbers={numbers} status={callStatus} addNum={addNum} makeCall={makeCall} toggle={toggleNumPad} calling={calling} showcall={true} username={user.user} name={name}/>
      )
  }else {
      return (
          <NumPad numbers={numbers} backspaceNum={backspaceNum} addNum={addNum} makeCall={makeCall} toggle={toggleNumPad} calling={calling} onTime={setCallTime} callTime={callTime}/>
      )
  }
    }



}

export default App;


