import uuidv4 from "uuid/v4";

const POMODORO_TIME = 25 * 60 * 1000;
const REGULAR_BREAK_TIME = 5 * 60 * 1000;
const LONG_BREAK_TIME = 15 * 60 * 1000;
const POMODORO_SET = 4;

const startBreak = pomodoro => {
  const breakTime = (pomodoro.count % POMODORO_SET === 0) ? LONG_BREAK_TIME : REGULAR_BREAK_TIME;

  return {
    ...pomodoro,
    finishTo: Date.now() + breakTime,
    remaining: breakTime - 1000,
    state: "break",
  };
}

const start = (taskId, count) => ({
  uuid: uuidv4(),
  finishTo: Date.now() + POMODORO_TIME,
  isRunning: true,
  remaining: POMODORO_TIME - 1000,
  taskId: taskId,
  count: count + 1
});

const cancel = pomodoro => ({
  ...pomodoro,
  isRunning: false,
  remaining: 0
});

const finish = pomodoro => {
  if(pomodoro.state !== "break")
    startBreak(pomodoro);

  return { ...pomodoro, state: null, isRunning: false };
};

const tick = (pomodoro, now) => ({
  ...pomodoro,
  remaining: pomodoro.finishTo - now
});

export { start, cancel, finish, tick };
