import React, {Component, useState} from 'react';
import API from '../services/api';
import AuthService from '../services/auth.service';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import logo from '../images/logo_transparent.jpg'

function handleLogin() {
    localStorage.setItem('token', 'admin')
    /*   AuthService.login(this.state.email, this.state.password, this.state.isAdmin).then(
        () => {
            if (this.state.isAdmin) {
                this.props.history.push("/estates");
                window.location.reload(false);
            } 
            else {
                this.props.history.push("/my-estate");
                window.location.reload(false);
            } 
        },
        error => {
          console.log("Noe gikk feil.");
        });*/
    }

function Login(props)  {
    const [state , setState] = useState({
        email : "",
        password : "",
    })

    const history = useHistory();
    const routeChange = () => {
        let path = '/AdminEstates';
        history.push(path);
    }

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    
    const handleSubmit = () => {
        console.log(state);
        if (document.getElementById('email').value == '' || 
            (!document.getElementById('email').value.includes('@')) ||
            document.getElementById('password').value == '')
            return;
        else {
            handleLogin();
            routeChange();
            window.location.reload(false);
        }
    }

    
    
    
    return(
        <div className="form">
            <div id="left">
            <img style={{height: "500px", width: "500px"}} src={logo} alt="logoen"/>

                <div class="description">
                    <p>
                        Røddi er en nettside som hjelper deg å gjøre opp <strong>dødsbo</strong>
                    </p>
                </div>
            </div>

            <div id="right">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">E-mail</label>
                    <input type="email" 
                        className="form-control"
                        id="email" 
                        required
                        placeholder="Skriv inn din E-mail" 
                        value={state.email} 
                        onChange={handleChange}/>
                </div> 
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">Passord</label>
                    <input type="password" 
                        className="form-control" 
                        id="password"
                        required
                        placeholder="Skriv inn ditt passord"
                        value={state.password} 
                        onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit" className="btn btn-outline-danger" onClick={handleSubmit} id="Login">Logg inn</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Login;