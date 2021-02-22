import React, {useState, useEffect} from 'react';
import Estate from './Estate';
import tempImage from '../images/-wide.jpg'
import authService from '../services/auth.service';





function AdminEstates() {
    const [nameInput, setNameInput] = useState("");
    const [estates, setEstates] = useState([]);

    // get Estates from Backend and initialize list of estates with these
    useEffect(() => {
        authService.getEstates().then(res => {
            let initEstates = []
            for (let i = 0; i < res.length; i++){
                let tempEstate = new Estate();
                tempEstate.state = {
                    id: res[i].id,
                    name: res[i].name,
                    status: res[i].status
                }
                initEstates.push(tempEstate);
    
            }
            let newEstates = estates.concat(initEstates);
            setEstates(newEstates);
            //console.log(initEstates);
        });
    }, [])
    
    const handleChange = (e) => {
       setNameInput(e.target.value);
    }

    function addToEstateList() {
        const x = new Estate()
        x.state = {
            name: nameInput,
            status: true
        }
        let newEstates = estates.concat([x]);
        authService.addEstate(x.state.name, true);
        setEstates(newEstates);
    }

    function submitEstate() {
        document.getElementById('confirmName').innerHTML = '';
        if (document.getElementById('nameInput').value != '') {
            addToEstateList();
            setNameInput("");
        }
        else {
            document.getElementById('confirmName').innerHTML = 'Vennligst fyll inn et navn på dødsboet!';
            document.getElementById('confirmName').style.color = 'red';
        }
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
                        <div key={"estate"+index} id={"e"+index}>
                            <h1>Dødsbo {item.state.name}</h1>
                            <img style={{height: "200px", width: "360px"}} src={tempImage} alt="temporary pic"/>
                            {/* img med src=item.state.image */}
                        </div>
                    ))}
                </ul>
            </div>
        </div>

    )
}
export default AdminEstates;