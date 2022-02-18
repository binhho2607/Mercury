import {useEffect, useState} from 'react'
import {FaPhoneAlt} from "react-icons/fa";

async function updateEntry(name, uri, password, socket, username){
    const res = await fetch('http://localhost:8080/', {
   method: 'PUT',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({username: username, name: name, uri: uri, pass:password, socket: socket}), //TODO MIGHT NEED TO BE JSON
credentials: 'include',

 })
  return res.json()
}

async function getEntry(){
    const res = await fetch('http://localhost:8080/', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   },
credentials: 'include',
 })
  return res.json()
}

const Profile = ({onSettings, user}) =>{
    // console.log(user)
    const [name, setName] = useState(user.name)
    const [uri, setURI] = useState(user.uri)
    const [password, setPassword] = useState(user.pass)
    const [socket, setSocket] = useState(user.socket)

    useEffect(async ()=>{
        const res = await getEntry()
        setName(res.name)
        setURI(res.uri)
        setPassword(res.pass)
         setSocket(res.socket)

    },[])


    const onSubmit = async (e) =>  {
        e.preventDefault()
        // console.log(socket)
        onSettings(name, uri, password, socket)
        updateEntry(name, uri, password, socket, user.user)
        const res = await getEntry()
        setName(res.name)
        setURI(res.uri)
        setPassword(res.pass)
         setSocket(res.socket)

    }
    // console.log(name)
    return (
        <form className='add-form' onSubmit={onSubmit}>

            <div className = 'form-control'>
                <label >Display Name</label>
                <input type='text' placeholder='Display Name'
                value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className = 'form-control'>
                <label>URI</label>
                <input type='text' placeholder='URI'
                value={uri} onChange={(e) => setURI(e.target.value)}/>
            </div>

            <div className = 'form-control'>
                <label>Password</label>
                <input type='password' placeholder='Password'
                value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className = 'form-control'>
                <label>Socket</label>
                <input type='text' placeholder='Socket'
                value={socket} onChange={(e) => setSocket(e.target.value)}/>
            </div>
            <div className='center'>
                <div className='shift_down_call'>
                    <button className='btn_home' type = 'submit'><FaPhoneAlt size={35} style={{cursor: 'pointer',margin: 0}}/>Call</button>
                    {/*<input className='btn btn-block' type = 'submit' value='Make Call'/>*/}
                </div>

            </div>

        </form>
    )
}

export default Profile