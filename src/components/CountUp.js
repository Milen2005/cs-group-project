"use client";

import { useEffect, useState } from "react";

export default function CountUp({ target, duration = 1000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const targetVal = parseInt(target, 10);
    if (isNaN(targetVal) || targetVal === 0) {
      setCount(0);
      return;
    }

    const stepTime = 25;
    const steps = duration / stepTime;
    const stepVal = Math.ceil(targetVal / steps);

    const timer = setInterval(() => {
      start += stepVal;
      if (start >= targetVal) {
        setCount(targetVal);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
