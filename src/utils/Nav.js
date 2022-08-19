import React, { useState, useEffect } from 'react';
import logo from '../images/celo.png';
import UAuth from '@uauth/js';
import transakSDK from "@transak/transak-sdk";

let transak = new transakSDK({
  apiKey: "fec0443a-44f5-4890-aa3f-b09626d6485e", // Your API Key
  environment: "STAGING", // STAGING/PRODUCTION
  defaultCryptoCurrency: "ETH",
  walletAddress: "", // Your customer's wallet address
  themeColor: "000000", // App theme color
  fiatCurrency: "", // INR/GBP
  email: "", // Your customer's email address
  redirectURL: "",
  hostURL: window.location.origin,
  widgetHeight: "550px",
  widgetWidth: "95%",
});

transak.on(transak.ALL_EVENTS, (data) => {
  console.log(data);
});

const uauth = new UAuth(
  {
    clientID: "20e4245a-f46a-40b1-b6dc-d8a8fb529a58",
    redirectUri: "https://cryptopunk-lake.vercel.app/",
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
                <li onClick={() => transak.init()}>
                  <a href='#' className='btn'>Quick Monie</a>
                </li>
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