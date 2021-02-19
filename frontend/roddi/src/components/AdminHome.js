import React, {useState} from 'react';
import Estate from './Estate';
import CreateEstate from './CreateEstate';
//import EditEstate from './EditEstate';


function AdminHome() {
    const [nameInput, setNameInput] = useState("");
    const [estates, setEstates] = useState([]);
    

    const handleChange = (e) => {
       setNameInput(e.target.value);
    }

    function addToEstateList() {
        let est = new Estate();
        est.state.name=nameInput;
        const newEstatesList = estates.concat({est});
        console.log(est)
        setEstates(newEstatesList);
        // updateRender()
    }

    function submitEstate() {
       /*  document.getElementById('confirmName').innerHTML = '';
        if (document.getElementById('estateInputName').value != '') {
           
        }
        else {
            document.getElementById('confirmName').innerHTML = 'Vennligst fyll inn et navn på dødsboet!';
            document.getElementById('confirmName').style.color = 'red';
        }   */
        addToEstateList();
    }


    return(
        <div>
            <div className="createEstate">
                <form className="form">
                    <div className ="form-group text-left" >
                    <label htmlFor="exampleUserName">Opprett Dødsbo</label>
                    <input type="text" 
                        className="form-control" 
                        id="nameInput" 
                        required
                        placeholder="Skriv inn navn på dødsbo" 
                        value={nameInput} 
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

            <div className="estates">
                <ul className="estateList">
                    {estates.map((item, index) => (
                        <li key={"estate"+index}><Estate name={item.name} /></li>
                    ))}
                </ul>
            </div>
        </div>

    )
}
export default AdminHome;