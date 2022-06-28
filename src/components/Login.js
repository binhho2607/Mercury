import PropTypes from 'prop-types';
import {useEffect, useState} from "react";


async function loginUser(credentials) {
 const res = await fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials),
credentials: 'include',

 })
  return res.json()
}



const Login = ({setToken,getUser}) => {
  useEffect(() => { document.body.style.backgroundColor = '#7e1cc9' }, [])
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();

    const res = await loginUser({
      username,
      password
    });


    console.log(res['state'])
  if((res['state']) === 'incorrect'){
    alert("Incorrect username or password!")
  }
    getUser();
  }
    return(
        <div className='login_container' >
        <div className='login-wrapper'>
          <h1 className='logo'>Mercury</h1>
    <form onSubmit={handleSubmit} className='shift_down_login'>
      <label className='center' style={{color:'#7e1cc9'}}>
        Username
      </label>
        <input className='login' type="text" onChange={e => setUserName(e.target.value)}/>
      <label className='center_password' style={{color:'#7e1cc9'}}>
        Password </label>
        <input className='login' type="password" onChange={e => setPassword(e.target.value)}/>

      <div className='center'>
        <button type="submit" className='submitbtn'>Login</button>
      </div>
    </form>
          </div>
          </div>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default Login