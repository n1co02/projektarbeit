import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchData = async (
  setData: (data: DocumentData | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  const randomId = Math.floor(Math.random() * 1003) + 1; // random number between 1 and 1003
  const docId = String(randomId); // convert the random number to string
  try {
    const docRef = doc(db, 'tasks', docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const randomDocument = docSnapshot.data();
      setData(randomDocument);
    } else {
      fetchData(setData, setIsLoading); // Retry if the document does not exist
    }

    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const handleAnswerChange = (
  text: string,
  setAnswer: (answer: string) => void
) => {
  setAnswer(text);
};

export const handleAnswerSubmit = (
  data: DocumentData | null,
  answer: string,
  setIsStarted: (isStarted: boolean) => void,
  setIsCorrect: (isCorrect: boolean) => void,
  setAnswer: (answer: string) => void,
  setData: (data: DocumentData | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsStarted(true);
  if (data?.german.toLowerCase() === answer.toLowerCase().trim()) {
    setIsCorrect(true);
    setAnswer('');
    fetchData(setData, setIsLoading); // Call fetchData to fetch new data
  } else {
    setIsCorrect(false);
  }
};
