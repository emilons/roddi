import React, { useState, useEffect } from 'react';
import Estate from './Estate';
import authService from '../services/auth.service';


function Statistics() {

    const [numberOfNewEstates, setNumberOfNewEstates] = useState(undefined)
    const [numberOfNewUsers, setNumberOfNewUsers] = useState(undefined)
    const [numberOfNewVotes, setNumberOfNewVotes] = useState(undefined)
    
    //Teller opp alle nye Estates
    useEffect(() => {
        var count = 0
        authService.getEstatesCreatedToday().then((res) => {
          for (let i = 0; i < res.length; i++) {
            count += 1
          }
          setNumberOfNewEstates(count)
        });
    });

    //Teller opp alle nye Users
    useEffect(() => {
        var count = 0
        authService.getUsersCreatedToday().then((res) => {
          for (let i = 0; i < res.length; i++) {
            count += 1
            };
          setNumberOfNewUsers(count)
        });
    });

    //Teller opp alle nye Votes
    useEffect(() => {
        var count = 0
        authService.getVotesFromToday().then((res) => {
          for (let i = 0; i < res.length; i++) {
            count += 1
            };
          setNumberOfNewVotes(count)
        });
    });

    return(<div>
            <div>
                <h1>Statistikk for Røddi</h1>
            </div>
            <div>
                <h8>Dødsbo opprettet i dag:</h8> <h8 style = {{color: 'red'}}>{numberOfNewEstates}</h8>
            </div>
            <div>
                <h8>Brukere registrert i dag:</h8> <h8 style = {{color: 'red'}}>{numberOfNewUsers}</h8>
            </div>
            <div>
                <h8>Antall stemmer på eiendeler i dag: </h8> 
                <h8 style = {{color: 'red'}}>{numberOfNewVotes}</h8>
            </div>
        </div>);
  }
export default Statistics;