import React, { useState, useEffect } from 'react';
import logo from '../images/celo.png';
import UAuth from '@uauth/js';

const uauth = new UAuth(
  {
    clientID: "20e4245a-f46a-40b1-b6dc-d8a8fb529a58",
    redirectUri: "https://legoshack.vercel.app/",
    scope: "openid wallet"
  }
)



const Nav = ({navv, setNavv}) => {
    const [userWallet, setUserWallet] = useState(null);

    //useEffect model
    useEffect(() => {
    // setUserWallet("Login With Unstoppable")
    uauth.user()
    .then((user) => {
      setUserWallet(user.sub)
      // user exists
      console.log("User information:", user);
    })
    .catch((err) => {
      console.log(err)
      // user does not exist
    })
  }, []);

  //login button
  const login = async () => {
    try {
        const authorization = await uauth.loginWithPopup();
        uauth.user()
        .then((user) => {
            setUserWallet(user.sub)
            // user exist
            console.log("User information:", user);
        })
        console.log(authorization)
    } catch (err) {
        console.error(err)
    }
  }

  const logout = async () => {
    try {
        await uauth.logout();
        setUserWallet(null);
    } catch (err) {
        console.error(err);
    }
  }

  
  return (
    <div> 
        <header>
          <div className="container">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <h3>CryptoPunk</h3>
            </div>

            <div className="links">
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                {/* <li><a href="#">Testimonials</a></li> */}
                {userWallet ? 
                <>
                <li onClick={() => login()}>
                    <a href="#" className="btn">{userWallet}</a>
                </li>
                <li onClick={() => logout()}>
                    <a href="#" className="btn yellow">Signout</a>         
                </li>
                </>
                 : 
                <li onClick={() => login()}>
                    <a href="#" className="btn">Signup With Unstoppable</a>
                </li>}
              </ul>
            </div>

            <div className="overlay"></div>

            <div className="hamburger-menu">
              <div className="bar" onClick={() => {setNavv(!navv)}}></div>
            </div>
          </div>
        </header>
    </div>
  )
}

export default Nav