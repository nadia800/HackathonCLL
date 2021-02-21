import React, { useState, useRef } from "react";
import Model from "./Model.jsx";
import "./App.css";
import Interface from "./Interface.jsx";
import "./LogIn.css";

function LogIn() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Nom = useRef();
  const MotPasse = useRef();

  let [Connect, setConnect] = useState(null);
  let [AccessToken, setAccessToken] = useState(null);
  //let [Compte, setCompte] = useState(null);

  const loginn = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        localStorage.setItem(
          "Token",
          JSON.parse(this.responseText).AccessToken
        );
        //setCompte(JSON.parse(this.responseText).Compte);
        setAccessToken(JSON.parse(this.responseText).AccessToken);
        setConnect(true);
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 403
      ) {
        setConnect(false);
      }
    };
    // open the request with the verb and the url
    xhr.open("POST", "http://localhost:8080/LogIn");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(
      JSON.stringify({
        AddGmail: Nom.current.value,
        MotPasse: MotPasse.current.value,
      })
    );
  };

  return Connect === true ? (
    <Interface AccessToken={AccessToken.split(",")} />
  ) : Connect === false ? (
    <div>Data incorrect </div>
  ) : (
    <div className="page">
      <div className="LogBlock">
        <a className="LogTitre">SIGN IN</a>
        <br />

        <a className="Sign">Sign in</a>
        <div className="NameBlock">
          <label for="email">Email:</label>
          <input
            type="text"
            name="nom"
            placeholder="Adresse e-mail ou numero tel"
            ref={Nom}
          />
          <br />
          <br />
          <label for="pwd">Password:</label>
          <input
            type="password"
            name="passe"
            placeholder="Mot de passe"
            ref={MotPasse}
          />
          <br />
          <br />
          <button onClick={loginn}>Log In</button>
          <button type="button" onClick={handleShow}>
            Sign Up
          </button>
          <br />
        </div>
        {show ? <Model show={show} hide={handleClose} /> : null}
      </div>
    </div>
  );
}

export default LogIn;
