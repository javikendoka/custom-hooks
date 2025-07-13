import React, { useState } from "react";

export const useCounter = ({ initValue= 1, inc = 1, minValue = 0 }) => {
  const [counter, setCounter] = useState(initValue);

  return {
    counter,
    increment: () => setCounter((prev) => prev + inc),
    decrement: () => setCounter((prev) => (prev > minValue ? prev - inc : prev)),
    reset: () => setCounter(initValue),
  };
};
