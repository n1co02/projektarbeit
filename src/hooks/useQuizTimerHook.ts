import { useState, useEffect } from 'react';

interface useCountdownTimerProps {
  isLoading: boolean;
  time: number | null;
  task: string;
  totalQuestions: number;
}

export const useQuizTimer = ({
  isLoading,
  time,
  task,
  totalQuestions,
}: useCountdownTimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const handleTimer = async () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    const newIntervalId = window.setInterval(() => {
      setElapsedTime((prevElapsedTime) => {
        if (
          typeof prevElapsedTime === 'number' &&
          prevElapsedTime > 0 &&
          questionsAsked < totalQuestions
        ) {
          return prevElapsedTime - 1;
        } else {
          if (
            time != null &&
            prevElapsedTime === 0 &&
            questionsAsked < totalQuestions
          ) {
            setQuestionsAsked(questionsAsked + 1);
            setElapsedTime(time);
            handleTimer(); // Reset the elapsed time to the initial timer value
            console.log(totalQuestions, questionsAsked);
            console.log(isFinished);
          } else {
            setIsFinished(true);
          }
          clearInterval(newIntervalId);
        }
        return prevElapsedTime;
      });
    }, 900);
    setIntervalId(newIntervalId); // Update the intervalId state with the new interval ID
  };

  useEffect(() => {
    if (
      isLoading == true &&
      time != null &&
      time > 0 &&
      task !== '' &&
      elapsedTime === 0
    ) {
      setIsDisabled(false);
      setElapsedTime(time);
      handleTimer();
    }
  }, [isLoading, time, task]);

  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return { elapsedTime, isDisabled, isFinished };
};
