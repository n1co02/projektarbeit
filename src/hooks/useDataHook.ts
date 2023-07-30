import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useEffect, useState } from 'react';

export const useData = () => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const randomId = Math.floor(Math.random() * 1003) + 1; // random number between 1 and 1003
    const docId = String(randomId); // convert the random number to string
    try {
      const docRef = doc(db, 'tasks', docId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const randomDocument = docSnapshot.data();
        setData(randomDocument);
      } else {
        fetchData(); // Retry if the document does not exist
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, fetchData };
};
