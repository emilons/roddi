import React, {useState} from 'react';
import Estate from './Estate';
import CreateEstate from './CreateEstate';


function AdminHome() {
    const [state , setState] = useState({
        estateName : "",
        estates : [],

    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }



    return(
        <div className="adminHome">
            <CreateEstate/>
            <div className="estates">
                <Estate id="estate1"/>
                <Estate id="estate2"/>
            </div>
        </div>

    )
}
export default AdminHome;