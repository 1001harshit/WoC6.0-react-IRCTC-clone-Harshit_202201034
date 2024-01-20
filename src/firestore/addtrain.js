/*This code is additional just for adding data in trains collection in firebse
*/



import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const AddTrain = () => {
  const handleUpload = async () => {
    try {
      const trainsCollectionRef = collection(db, 'trains');
      const trainData = {
        trainName: 'SuperFast Train',
        trainNumber: '12346',
        route: [
          {
            station: 'Ahmedabad',
            code: 'AMD',
            time: '10:00 AM',
            date: '2022-01-01',
          },
          {
            station: 'Udaipur',
            code: 'UDR',
            time: '11:00 AM',
            date: '2022-01-01',
          },
          {
            station: 'Jaipur',
            code: 'JPR',
            time: '12:00 PM',
            date: '2022-01-01',
          },
          {
            station: 'Agra',
            code: 'AGA',
            time: '01:00 PM',
            date: '2022-01-01',
          },
          {
            station: 'Delhi',
            code: 'DLI',
            time: '02:00 PM',
            date: '2022-01-01',
          },
          {
            station: 'Lucknow',
            code: 'LCW',
            time: '04:00 PM',
            date: '2022-01-01',
          },
          {
            station: 'Ayodhya',
            code: 'JSR',
            time: '06:00 PM',
            date: '2022-01-01',
          },
        ],
        daysOfRunning: ['Monday','Tuesday', 'Wednesday','Thursday', 'Friday'],
      seat: {
          "sleeper": {
            "total": 50,
            "booked": 0,
            "quotas": {
              "general": {
                "total": 40,
                "booked": 0
              },
              "female": {
                "total": 5,
                "booked": 0
              },
              "oldAge": {
                "total": 3,
                "booked": 0
              },
              "tatkal": {
                "total": 2,
                "booked": 0
              }
            }
          },
          "3ac": {
            "total": 30,
            "booked": 0,
            "quotas": {
              "general": {
                "total": 20,
                "booked": 0
              },
              "female": {
                "total": 5,
                "booked": 0
              },
              "oldAge": {
                "total": 3,
                "booked": 0
              },
              "tatkal": {
                "total": 2,
                "booked": 0
              }
            }
            
          },
          "2ac": {
            "total": 30,
            "booked": 0,
            "quotas": {
              "general": {
                "total": 20,
                "booked": 0
              },
              "female": {
                "total": 5,
                "booked": 0
              },
              "oldAge": {
                "total": 3,
                "booked": 0
              },
              "tatkal": {
                "total": 2,
                "booked": 0
              }
            }
            
          },
          "1ac": {
            "total": 30,
            "booked": 0,
            "quotas": {
              "general": {
                "total": 20,
                "booked": 0
              },
              "female": {
                "total": 5,
                "booked": 0
              },
              "oldAge": {
                "total": 3,
                "booked": 0
              },
              "tatkal": {
                "total": 2,
                "booked": 0
              }
            }
            
          },
        }
      
      };

      const docRef = await addDoc(trainsCollectionRef, trainData);
      console.log('Train added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding train: ', error.message);
    }
  };

  return (
    <div>
      <h1>Add Train</h1>
      <button onClick={handleUpload}>Upload Train</button>
    </div>
  );
};

export default AddTrain;
