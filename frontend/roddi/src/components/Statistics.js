import React, { useState, useEffect } from 'react';
import Estate from './Estate';
import authService from '../services/auth.service';


function Statistics() {

    const [numberOfNewEstates, setNumberOfNewEstates] = useState(undefined);
    const [numberOfNewUsers, setNumberOfNewUsers] = useState(undefined);
    const [numberOfNewVotes, setNumberOfNewVotes] = useState(undefined);

    const [totalNumberOfEstates, setTotalNumberOfEstates] = useState(undefined);
    const [totalNumberOfUsers, setTotalNumberOfUsers] = useState(undefined);
    
    
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

    //Teller opp totalt antall estates i systemet
    useEffect(() => {
      var count = 0
      authService.getEstates().then((res) => {
        for (let i = 0; i < res.length; i++) {
          count += 1
          };
        setTotalNumberOfEstates(count)
      });
  });

    //Teller opp totalt antall brukere i systemet
    useEffect(() => {
      var count = 0
      authService.getUsers().then((res) => {
        for (let i = 0; i < res.length; i++) {
          count += 1
          };
        setTotalNumberOfUsers(count)
      });
  });


    return(<div>
            <div>
                <h1>Statistikk for Røddi</h1>
            </div>
            <div>
                <h6>Dødsbo opprettet i dag:</h6> <h6 style = {{color: 'red'}}>{numberOfNewEstates}</h6>
                <br></br>
                <h6>Brukere registrert i dag:</h6> <h6 style = {{color: 'red'}}>{numberOfNewUsers}</h6>
                <br></br>
                <h6>Antall stemmer på eiendeler i dag:</h6> 
                <h6 style = {{color: 'red'}}>{numberOfNewVotes}</h6>
            </div>

                
          <div>
              <br></br> <br></br>
              <h6>Totalt antall dødsbo:</h6> <h6 style = {{color: 'red'}}>{totalNumberOfEstates}</h6>
              <br></br>
              <h6>Totalt antall brukere:</h6> <h6 style = {{color: 'red'}}>{totalNumberOfUsers}</h6>
            </div>
        </div>);
  }

export default Statistics;