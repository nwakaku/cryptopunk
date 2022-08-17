import React, { useState, useEffect } from 'react';
import person from '../images/person.png';
import axios from "axios";


const Body = ({setAnimate, animate}) => {
  // useEffect(() => {
    
  // }, [third])
  

  const API_URL = 'https://unstoppabledomains.g.alchemy.com/domains/';
  const API_KEY = 'ZDwwQcFfAdAa-QTOY3zKqEsL5DutDMTk';

  const [ info, setInfo ] = useState(null);
  const [ userDomain, setUserDomain ] = useState();

  const checkOut = (e) => {
    e.preventDefault();

    // let userDomain = document.getElementById('domain').value;
    if (!userDomain) return;

    axios.get(API_URL + userDomain, {
      headers: {
        'Authorization': `bearer ${API_KEY}`
      }
    })
    .then(res => {
      setInfo(res.data);
      // console.log(res.data);
      // console.log(info);
    })
    .catch(err => {
      setInfo(err);
    });
    setPopUp(!popUp)
  }

  const [popUp, setPopUp] = useState(true);

  // console.log(info);


  return (
    <div>
        <div className="showcase-area">
        {/* popup area */}
        <div className={ `${popUp ? 'popup' : 'popup active'}`} id="popup-1">
        <div className="overlay"></div>
        <div className="content">
          <div className="close-btn" onClick={() => {setPopUp(!popUp);}}>
            &times;
          </div>
          <h1>Hash Phrase</h1>
          {info ? 
          <div>
            <p>DomainName : {info.meta.domain} </p><hr/>
            <p>Owner : {info.meta.owner} </p><hr/>
            <p>Blockchain : {info.meta.blockchain} </p><hr/>
            <p>Sale_Record : {info.records["whois.for_sale.value"] ? 
            "On Sale" : "Not on Sale"}
            </p><hr/>
            <p>Mail : {info.records["whois.email.value"]}</p><hr/>
            <p><strong>Here are the differnts blockchain addresses in the domain profile</strong></p><hr/>
            <div>
              {info.records["crypto.ETH.address"] ? 
              <p>ETH address : {info.records["crypto.ETH.address"]}</p> :
              <p>No ETH address</p>}
            </div><hr/>
            <div>
              {info.records["crypto.MATIC.version.MATIC.address"] ? 
              <p>Matic address : {info.records["crypto.MATIC.version.MATIC.address"]}</p> :
              <p>No matic address</p>}

                <button className="btn" >Send_Crypto</button>

            </div>
          </div> : 
          <p>please wait user is loading or user does not exit....</p>}
          {/* {hashes.length !== 0 ? 
          (<p> {hashes} </p>) : 
          (<p>Loading Please be patient</p>)} */}
          
        </div>
      </div>

          <div className="container">
            <div className="left">
              <div className="big-title">
                <h1>Future is here,</h1>
                <h1>Start Exploring now.</h1>
              </div>
              {/* <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus eius distinctio odit, magni magnam qui ex perferendis
                vitae!
              </p> */}
              <div className="cta">
                <form className='formstyle' onSubmit={checkOut}>
                  <input placeholder='domain address' className='inputform' onChange={(e) => {setUserDomain(e.target.value)}} required/>
                  <button className="btn" type='submit' >checkOut</button>
                </form>
                {/* <a href="#" className="btn">Get started</a> */}
              </div>
            </div>

            <div className="right">
              <img src={person} alt="Person Image" className="person" />
            </div>
          </div>
        </div>

        <div className="bottom-area">
          <div className="container">
            <button className="toggle-btn" onClick={() => {setAnimate(!animate)}}>
              {animate ? <i className="far fa-moon"></i> :
              <i className="far fa-sun"></i>}
            </button>
          </div>
        </div>
    </div>
  )
}

export default Body