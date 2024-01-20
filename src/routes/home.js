
import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import styled from 'styled-components';
import { StyleSheetManager } from 'styled-components';


const PageContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const SearchButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
`;

const TrainBox = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
`;

const TrainName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TrainDetail = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;
const Home = () => {
  const [startStation, setStartStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trains"));
      const trains = [];
      
      querySnapshot.forEach((doc) => {
        const trainData = doc.data();
        const { route } = trainData;
          if (Array.isArray(route)) {
          const startIndex = route.findIndex((stop) => stop.station === startStation);
          const endIndex = route.findIndex((stop) => stop.station === destinationStation);
          for(var i=0;i<endIndex;i++){
            if(route[i].station===startStation){
              var a=i;
            }
          }
          const Date = route[i].date;
          if(Date===journeyDate){
          if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
            trains.push({
              trainNumber: trainData.trainNumber,
              trainName: trainData.trainName,
              route: route.slice(startIndex, endIndex + 1),
            });
          }}
        }
      });
  
      setSearchResults(trains);
    } catch (error) {
      console.error("Error searching for trains:", error.message);
    }
  };
  return (
    
    <PageContainer>
      <h1>Search Trains</h1>

      <SearchContainer>
        <SearchLabel>Start Station:</SearchLabel>
        <SearchInput
          type="text"
          value={startStation}
          onChange={(e) => setStartStation(e.target.value)}
        />
      </SearchContainer>

      <SearchContainer>
        <SearchLabel>Destination Station:</SearchLabel>
        <SearchInput
          type="text"
          value={destinationStation}
          onChange={(e) => setDestinationStation(e.target.value)}
        />
      </SearchContainer>

      <SearchContainer>
        <SearchLabel>Journey Date:</SearchLabel>
        <SearchInput
          type="date"
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
        />
      </SearchContainer>

      <SearchButton onClick={handleSearch}>Search</SearchButton>

      <ResultsContainer>
        <h2>Search Results:</h2>
        {searchResults.map((result, index) => (
          <TrainBox key={index}>
            <TrainName>{result.trainName}</TrainName>
            <TrainDetail>Train Number: {result.trainNumber}</TrainDetail>
            <TrainDetail>
              Start Station: {result.route[0].station} - Time: {result.route[0].time}
            </TrainDetail>
            <TrainDetail>
              End Station: {result.route[result.route.length - 1].station} - Time:{' '}
              {result.route[result.route.length - 1].time}
            </TrainDetail>
          </TrainBox>
        ))}
      </ResultsContainer>
    </PageContainer>
  );
};

export default Home;
