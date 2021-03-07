import React, {Component, useState} from 'react';
import { useHistory } from 'react-router-dom';
import API from '../services/api';
import AuthService from '../services/auth.service';
import { useHistory } from 'react-router-dom';
import Header from './Header';

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


    const [state , setState] = useState({
        username : "",
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
        if (document.getElementById('username').value == '' || 
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
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">Navn</label>
                    <input type="text" 
                        className="form-control"
                        id="username" 
                        required
                        placeholder="Skriv inn ditt navn" 
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
    );
}

export default Login;