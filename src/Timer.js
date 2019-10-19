import React from 'react';
import useInterval from './useInterval';

function format(milliseconds) {
  if (!milliseconds) return "00:00";

  return new Date(milliseconds).toISOString().substr(14, 5);
}

function Timer(props) {
	const DELAY = 1000;
	const { running, milliseconds, onTick } = props;

  useInterval(() => {
		onTick();
  }, running ? DELAY : null);

  return (
    <div>{format(milliseconds)}</div>
  );
}

export default Timer;
