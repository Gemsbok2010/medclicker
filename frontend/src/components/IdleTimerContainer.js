import { useIdleTimer } from "react-idle-timer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IdleTimerContainer = () => {
  const navigate = useNavigate();
  const [, setState] = useState("Active");
  const [count, setCount] = useState(0);
  const [, setRemaining] = useState(0);

  const onIdle = () => {
    setState("Idle");
    navigate("/logout");
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 1000 * 60 * 60 * 24,
    throttle: 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return <></>;
};
export default IdleTimerContainer;
