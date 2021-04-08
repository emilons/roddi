import React, {Fragment} from "react";


/**
 * A box which displays the vote possibilities and highlighst a member's vote
 * @param {int} props value - Value of a member's vote
 * @returns render of MemberVotes
 */
function MemberVotes(props) {
    if (props.value > 0 && props.value < 6) {
        return (
            <Fragment>
            <div className="voteDivide" style={{border: '1px solid', margin: "5px", color: '#900C27', backgroundColor: '#f8f0f2'}}>Fordel</div>
            <div className="voteDonate" style={{border: '1px solid', margin: "5px"}}>Doner</div>
            <div className="voteTrash" style={{border: '1px solid', margin: "5px"}}>Kast</div>
            </Fragment>
        )}
    else if (props.value == 0) {
        return (
            <Fragment>
            <div className="voteDivide" style={{border: '1px solid', margin: "5px"}}>Fordel</div>
            <div className="voteDonate" style={{border: '1px solid', margin: "5px", color: '#900C27', backgroundColor: '#f8f0f2'}}>Doner</div>
            <div className="voteTrash" style={{border: '1px solid', margin: "5px"}}>Kast</div>
            </Fragment>
        )}
    else if (props.value == -1 ) {
        return (
            <Fragment>
            <div className="voteDivide" style={{border: '1px solid', margin: "5px"}}>Fordel</div>
            <div className="voteDonate" style={{border: '1px solid', margin: "5px"}}>Doner</div>
            <div className="voteTrash" style={{border: '1px solid', margin: "5px", color: '#900C27', backgroundColor: '#f8f0f2'}}>Kast</div>
            </Fragment>
        )}
    else if (props.value == undefined) {
        return (<Fragment>
            <div className="voteDivide" style={{border: '1px solid', margin: "5px"}}>Fordel</div>
            <div className="voteDonate" style={{border: '1px solid', margin: "5px"}}>Doner</div>
            <div className="voteTrash" style={{border: '1px solid', margin: "5px"}}>Kast</div>
        </Fragment>)
    }
    else {
        <Fragment></Fragment>
    }
}
export default MemberVotes;