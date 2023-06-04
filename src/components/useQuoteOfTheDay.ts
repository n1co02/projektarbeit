import { useState, useEffect } from 'react';

const useQuoteOfTheDay = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      });
  }, []);
  return quote;
};
export default useQuoteOfTheDay;
