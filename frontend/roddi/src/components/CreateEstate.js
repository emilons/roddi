import React, {useState} from 'react';


function CreateEstate(props) {

    const [state , setState] = useState({
        estateName : "",
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    function submitEstate() {
        document.getElementById('confirmName').innerHTML = '';
        if (document.getElementById('estateName').value != '') {
            // function that makes estate
        }
        else {
            document.getElementById('confirmName').innerHTML = 'Vennligst fyll inn et navn på dødsboet!';
            document.getElementById('confirmName').style.color = 'red';
        }  
    }


    return(
    <div className="adminHome">
        <div className="createEstate">
                <form className="form">
                    <div className ="form-group text-left" >
                    <label htmlFor="exampleUserName">Opprett Dødsbo</label>
                    <input type="text" 
                        className="form-control" 
                        id="estateName" 
                        required
                        placeholder="Skriv inn navn på dødsbo" 
                        value={state.estateName} 
                        onChange={handleChange}
                    />
                    </div>
                    <small id="confirmName" 
                    className="form-text"> 
                    </small>
                </form>
            
            <button type="submit" className="btn btn-secondary" onClick={submitEstate}>
                Opprett Dødsbo
            </button>
            
            
        </div>
    </div>

    )
}
export default CreateEstate;