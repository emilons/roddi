import React, {Component, useState} from 'react';



function handleLogin() {

}

class Login extends React.Component {
    
    render() {
        return(
        <div className="form">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">E-mail</label>
                    <input type="text" className="form-control" placeholder="Skriv inn din E-mail"/>
                </div> 
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">Passord</label>
                    <input type="password" className="form-control" placeholder="Skriv inn ditt passord"/>
                </div>
                <div>
                    <button type="submit" className="btn-secondary">Logg inn</button>
                </div>
            </form>
        </div>
    );
}}

export default Login;