import { useState, useEffect } from 'react';

export const useTimer = (
  initialTimer: number,
  totalQuestions: number,
  handleQuestions: { (): Promise<void>; (): void }
) => {
  const [elapsedTime, setElapsedTime] = useState(initialTimer);
  const [isFinished, setIsFinished] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [questionsAsked, setQuestionsAsked] = useState(0);

  const handleTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(async () => {
      setElapsedTime((prevElapsedTime: number) => {
        if (
          typeof prevElapsedTime === 'number' &&
          prevElapsedTime > 0 &&
          questionsAsked < totalQuestions
        ) {
          return prevElapsedTime - 1;
        } else {
          clearInterval(newIntervalId);
          if (prevElapsedTime === 0 && questionsAsked < totalQuestions) {
            handleQuestions();
            setQuestionsAsked((prevQuestionsAsked) => prevQuestionsAsked + 1);
            setElapsedTime(initialTimer);
            handleTimer();
          } else {
            setIsFinished(true);
          }
          return prevElapsedTime;
        }
      });
    }, 1000);

    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    if (elapsedTime > 0 && !isFinished) {
      handleTimer();
    }
  }, [elapsedTime, isFinished]);

  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const startTimer = () => {
    setQuestionsAsked(0);
    setIsFinished(false);
    setElapsedTime(initialTimer);
  };

  return {
    elapsedTime,
    isFinished,
    startTimer,
  };
};
