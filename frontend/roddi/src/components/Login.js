import React, {Component, useState} from 'react';
import API from '../api'



function handleLogin() {
    API.get("/user", {
        params: {
            email: "",
            password: ""
        }
    })
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
        handleLogin();
    }


    
    
    return(
        <div className="form">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">E-mail</label>
                    <input type="text" 
                        className="form-control"
                        id="email" 
                        placeholder="Skriv inn din E-mail" 
                        value={state.email} 
                        onChange={handleChange}/>
                </div> 
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">Passord</label>
                    <input type="password" 
                        className="form-control" 
                        id="password"
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