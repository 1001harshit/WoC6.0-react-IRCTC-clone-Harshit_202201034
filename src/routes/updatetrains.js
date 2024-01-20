/*This code is additional just for adding data in trains collection in firebse
*/



import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import {db,app} from '../config/firebase';
const addTrainDataForDate = async (date, trainData) => {
  try {
    const docRef = await addDoc(collection(db, 'trains', 'dates', date), trainData);
    console.log(`Train data added for ${date} with ID: ${docRef.id}`);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const duplicateTrainsForDays = async (days) => {
  const today = new Date();

  const querySnapshot = await getDocs(collection(db, 'trains'));

  querySnapshot.forEach((doc) => {
    const trainData = doc.data();
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      const newDate = currentDate.toISOString().split('T')[0];

      const q = query(collection(db, 'trains', 'dates', newDate));

      try {
        const existingDocs =  getDocs(q);
        if (existingDocs.empty) {
           addTrainDataForDate(newDate, trainData);
        }
      } catch (error) {
        console.error('Error checking for existing documents: ', error);
      }
    }
  });
};





const UploadDataButton = () => {
  const handleUploadData = async () => {
    const numberOfDays = 5;
    await duplicateTrainsForDays(numberOfDays);
    console.log('Data uploaded successfully!');
  };

  return (
    <button onClick={handleUploadData}>Upload Data</button>
  );
};

export default UploadDataButton;
