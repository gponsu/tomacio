import React from 'react';
import useInterval from '../utils/useInterval';
import timerFormat from '../utils/timerFormat';

function Timer(props) {
	const DELAY = 1000;
	const { running, milliseconds, onTick } = props;

  useInterval(() => {
		onTick();
  }, running ? DELAY : null);

  return (
    <div>{timerFormat(milliseconds)}</div>
  );
}

export default Timer;
