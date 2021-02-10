import React, {Component, useState} from 'react';



function handleLogin() {

}

class Login extends React.Component {
    
    render() {
        return(
        <div className="login"> 
            <form>
                <label>
                Username:
                    <input type="text"/>
                </label>
                <label>
                Password:
                    <input type="password"/>
                </label>
                <button onClick={handleLogin}/>
            </form>
        </div>
    );
}}

export default Login;