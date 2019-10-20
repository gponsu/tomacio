import uuidv4 from "uuid/v4";

const POMODORO_TIME = 25 * 60 * 1000;
const REGULAR_BREAK_TIME = 5 * 60 * 1000;
const LONG_BREAK_TIME = 15 * 60 * 1000;
const POMODORO_SET = 4;

function pomodoroReducer(pomodoro, action) {
  switch (action.type) {
    case 'START_POMODORO':
      return {
        uuid: uuidv4(),
        finishTo: Date.now() + POMODORO_TIME,
        isRunning: true,
        remaining: POMODORO_TIME - 1000,
        taskId: action.taskId,
        count: pomodoro.count + 1
      };
    case 'CANCEL_POMODORO':
      return { ...pomodoro, isRunning: false, remaining: 0 };
    case 'FINISH_POMODORO':
      if(pomodoro.state !== "break") {
        const breakTime = (pomodoro.count % POMODORO_SET === 0) ? LONG_BREAK_TIME : REGULAR_BREAK_TIME;

        return {
          ...pomodoro,
          finishTo: Date.now() + breakTime,
          remaining: breakTime - 1000,
          state: "break",
        };
      }
      else {
        return { ...pomodoro, state: null, isRunning: false };
      }
    case 'TICK_POMODORO':
      return { ...pomodoro, remaining: pomodoro.finishTo - action.now };
    default:
      throw new Error();
  }
}

export default pomodoroReducer;
