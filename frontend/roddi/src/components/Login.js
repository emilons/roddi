import React, {Component, useState} from 'react';
import API from '../services/api';
import AuthService from '../services/auth.service';


function handleLogin() {

    AuthService.login(this.state.email, this.state.password, this.state.isAdmin).then(
        () => {
            if (this.state.isAdmin) {
                this.props.history.push("/estates");
                window.location.reload();
            } 
            else {
                this.props.history.push("/my-estate");
                window.location.reload();
            }
        },
        error => {
          console.log("Noe gikk feil.");
        });
    }

function Login(props)  {
    const [state , setState] = useState({
        email : "",
        password : "",
    })

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
        }
    }


    
    
    return(
        <div className="form">
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
                    <button type="submit" className="btn-secondary" onClick={handleSubmit}>Logg inn</button>
                </div>
            </form>
        </div>
    );
}

export default Login;