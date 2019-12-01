import { start, cancel, finish, tick } from "../utils/pomodoroActions.js";

function pomodoroReducer(pomodoro, action) {
  switch (action.type) {
    case 'START_POMODORO':
      return start(action.taskId, pomodoro.count);
    case 'CANCEL_POMODORO':
      return cancel(pomodoro);
    case 'FINISH_POMODORO':
      return finish(pomodoro);
    case 'TICK_POMODORO':
      return tick(pomodoro, action.now);
    default:
      throw new Error();
  }
}

export default pomodoroReducer;
