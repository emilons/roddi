import React, {useState, useEffect, Fragment} from "react";

function MemberVotes(props) {
    if (props.value > 0 && props.value < 6) {
        return (
            <Fragment>
            <div className="voteDivide" style={{border: '1px solid', margin: "2px", backgroundColor: 'yellow'}}>Fordel</div>
            <div className="voteDonate" style={{border: '1px solid', margin: "2px"}}>Doner</div>
            <div className="voteTrash" style={{border: '1px solid', margin: "2px"}}>Kast</div>
            </Fragment>
        )}
    else if (props.value == 0) {
        return (
            <Fragment>
            <div className="voteDivide" style={{border: '1px solid', margin: "2px"}}>Fordel</div>
            <div className="voteDonate" style={{border: '1px solid', margin: "2px", backgroundColor: 'yellow'}}>Doner</div>
            <div className="voteTrash" style={{border: '1px solid', margin: "2px"}}>Kast</div>
            </Fragment>
        )}
    else if (props.value == -1 ){
        return (
            <Fragment>
            <div className="voteDivide" style={{border: '1px solid', margin: "2px"}}>Fordel</div>
            <div className="voteDonate" style={{border: '1px solid', margin: "2px"}}>Doner</div>
            <div className="voteTrash" style={{border: '1px solid', margin: "2px", backgroundColor: 'yellow'}}>Kast</div>
            </Fragment>
        )}
    else {
        return (<Fragment></Fragment>)
    }
}
export default MemberVotes;