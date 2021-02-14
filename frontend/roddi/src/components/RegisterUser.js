import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

function RegisterUser(props) {
    const [state , setState] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword: "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    /* Funksjonen som sender dette til databasen: 
        - Kjører et kall hvor man sjekker om verdier er tatt av andre brukere fra før.
    */

    return(
        <div className="form">
            <form>
                <div className ="form-group text-left" >
                <label htmlFor="exampleUserName">Fullt Navn</label>
                <input type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Skriv inn ditt fulle navn" 
                    value={state.name} 
                    onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email-Adresse</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       placeholder="Skriv inn din Email" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Passord</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Velg et passord"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Bekreft Passord</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Bekreft passordet"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-secondary"
                    >
                    Registrer deg
                </button>
                <button type="submit" className="btn-light"><NavLink to="/Login"> Allerede bruker? Logg inn her.</NavLink></button>
            </form>
        </div>
    )
}

export default RegisterUser;