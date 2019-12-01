import { todayStartOfDay } from "./date";

const findCompletedPomodoros = (tasks) => {
  return tasks.reduce((accumulator, task) => {
    return accumulator.concat(task.pomodoros.filter(pomodoro => {
      return pomodoro.remaining === 0 && pomodoro.finishTo >= todayStartOfDay();
    }));
  }, []);
}

const findCanceledPomodoros = (tasks) => {
  return tasks.reduce((accumulator, task) => {
    return accumulator.concat(task.pomodoros.filter(pomodoro => {
      return pomodoro.remaining > 0 && pomodoro.finishTo >= todayStartOfDay();
    }));
  }, []);
}

const pomodorosToday = tasks => {
  return [
    {
      "id": "Completed",
      "label": "Completed pomodoros",
      "value": findCompletedPomodoros(tasks).length
    },
    {
      "id": "Canceled",
      "label": "Canceled pomodoros",
      "value": findCanceledPomodoros(tasks).length
    }
  ];
}

const timeToday = tasks => {
  return [
    {
      "id": "Focused",
      "label": "Focused time",
      "value": findCompletedPomodoros(tasks).length * 25 * 60 * 1000
    },
    {
      "id": "Interrupted",
      "label": "Time lost due to interruptions",
      "value": findCanceledPomodoros(tasks).reduce((acc, pomodoro) => (
        acc += (25 * 60 * 1000 - pomodoro.remaining)
      ), 0)
    }
  ];
}

export { pomodorosToday, timeToday };
