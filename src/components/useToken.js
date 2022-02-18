import { useState } from 'react';

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');

  if (!tokenString) {
		return null
	}
	const item = JSON.parse(tokenString)

	const now = new Date()
      console.log(item.expiry)
      console.log(now.getTime())
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem('token')
		return null
	}
	return item?.token
       // const tokenString = localStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);
    // return userToken?.token
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: userToken,
		expiry: now.getTime() + 30000,
	}
    localStorage.setItem('token', JSON.stringify(item));
    setToken(item.value.token)
    //   localStorage.setItem('token', JSON.stringify(userToken));
    // setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

export default useToken