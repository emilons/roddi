import React, { useState, useEffect } from 'react';
import authService from '../services/auth.service';

function Statistics() {
  const [numberOfNewEstates, setNumberOfNewEstates] = useState(undefined);
  const [numberOfNewUsers, setNumberOfNewUsers] = useState(undefined);
  const [numberOfNewVotes, setNumberOfNewVotes] = useState(undefined);

  const [totalNumberOfEstates, setTotalNumberOfEstates] = useState(undefined);
  const [totalNumberOfUsers, setTotalNumberOfUsers] = useState(undefined);

  /**
   * Counts up all new Estates and sets the state
   */
  useEffect(() => {
    var count = 0;
    authService.getEstatesCreatedToday().then((res) => {
      for (let i = 0; i < res.length; i++) {
        count += 1;
      }
      setNumberOfNewEstates(count);
    });
  });

  /**
   *  Counts up all new users and sets the state
   */
  useEffect(() => {
    var count = 0;
    authService.getUsersCreatedToday().then((res) => {
      for (let i = 0; i < res.length; i++) {
        count += 1;
      }
      setNumberOfNewUsers(count);
    });
  });

  /**
   *  Counts up all new votes and sets the state
   */
  useEffect(() => {
    var count = 0;
    authService.getVotesFromToday().then((res) => {
      for (let i = 0; i < res.length; i++) {
        count += 1;
      }
      setNumberOfNewVotes(count);
    });
  });

  /**
   *  Counts up all Estates currently on the server
   */
  useEffect(() => {
    var count = 0;
    authService.getEstates().then((res) => {
      for (let i = 0; i < res.length; i++) {
        count += 1;
      }
      setTotalNumberOfEstates(count);
    });
  });

  /**
   *  Counts up all users currently on the server
   */

  useEffect(() => {
    var count = 0;
    authService.getUsers().then((res) => {
      for (let i = 0; i < res.length; i++) {
        count += 1;
      }
      setTotalNumberOfUsers(count);
    });
  });

  return (
    <div>
      <div>
        <h1>Statistikk for Røddi</h1>
      </div>
      <div>
        <h8>Dødsbo opprettet i dag:</h8>{' '}
        <h8 style={{ color: 'red' }}>{numberOfNewEstates}</h8>
        <br></br>
        <h8>Brukere registrert i dag:</h8>{' '}
        <h8 style={{ color: 'red' }}>{numberOfNewUsers}</h8>
        <br></br>
        <h8>Antall stemmer på eiendeler i dag: </h8>
        <h8 style={{ color: 'red' }}>{numberOfNewVotes}</h8>
      </div>

      <div>
        <br></br> <br></br>
        <h8>Totalt antall dødsbo:</h8>{' '}
        <h8 style={{ color: 'red' }}>{totalNumberOfEstates}</h8>
        <br></br>
        <h8>Totalt antall brukere:</h8>{' '}
        <h8 style={{ color: 'red' }}>{totalNumberOfUsers}</h8>
      </div>
    </div>
  );
}

export default Statistics;
