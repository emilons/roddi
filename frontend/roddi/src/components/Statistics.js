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
          
            <div className="Statistic">
              <div id="headerStatistics">
                <h4>Statistikk for Røddi</h4>
              </div>
                <table id="t01"> 
                  <tr>
                    <th> </th>
                    <th>Antall</th>
                  </tr>
                  <tr>
                    <td id="second">Dødsbo opprettet idag</td>
                    <td id="numbers1">{numberOfNewEstates}</td>
                  </tr>
                  <tr>
                  <td>Brukere registrert idag</td>
                    <td id="numbers">{numberOfNewUsers}</td>
                  </tr>
                  <tr>
                  <td id="second">Antall stemmer på eiendeler i dag</td>
                    <td id="numbers1">{numberOfNewVotes}</td>
                  </tr>
                  <tr>
                  <td>Totalt antall dødsbo</td>
                    <td id="numbers">{totalNumberOfEstates}</td>
                  </tr>
                  <tr>
                  <td id="second">Totalt antall brukere</td>
                    <td id="numbers1">{totalNumberOfUsers}</td>
                  </tr>

                </table>
            </div>

                
          
        </div>);
  }

export default Statistics;