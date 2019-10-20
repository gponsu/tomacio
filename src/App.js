import React from 'react';
import TaskList from "./TaskList";
import Timer from "./Timer";
import useStoredState from "./useStoredState";
import useStoredReducer from "./useStoredReducer";
import pomodoroReducer from "./pomodoroReducer";
import showNotification from "./showNotification";
import uuidv4 from "uuid/v4";

function App() {
  const [pomodoro, dispatch] = useStoredReducer("pomodoro", pomodoroReducer, { count: 0 });

  function handleStartPomodoro(uuid) {
    dispatch({ type: 'START_POMODORO', taskId: uuid });
  }

  function handleStopPomodoro(uuid) {
    dispatch({ type: 'CANCEL_POMODORO' });
  }

  function handleOnTick() {
    const now = Date.now();

    if(pomodoro.isRunning) {
      if(parseInt(pomodoro.finishTo) > now) {
        dispatch({ type: 'TICK_POMODORO', now });
      } else {
        if (pomodoro.state !== "break") {
          const index = tasks.findIndex(function(task) {
            return task.uuid === pomodoro.taskId;
          });

          setTasks([
            ...tasks.slice(0, index),
            {...tasks[index], ...{ pomodoros: [...tasks[index].pomodoros, { uuid: pomodoro.uuid, finishTo: pomodoro.finishTo, remaining: 0 }] }},
            ...tasks.slice(index + 1)
          ]);

          showNotification("El pomodoro ha acabado!");
        } else {
          showNotification("La pausa ha terminado!");
        }

        dispatch({ type: 'FINISH_POMODORO' });
      }
    }
  }

  const [tasks, setTasks] = useStoredState("tasks", []);
  function handleKeyUp(event) {
    if(event.key === "Enter" && event.target.value) {
      const task = {
        uuid: uuidv4(),
        title: event.target.value,
        pomodoros: []
      }

      setTasks(tasks => [...tasks, task]);
      event.target.value = null;
    }
  }
  function handleRemoveTask(uuid) {
    setTasks(tasks.filter(function(task) {
      return task.uuid !== uuid;
    }));
  }

  return (
    <div style={style}>
      <Timer running={pomodoro.isRunning} milliseconds={pomodoro.remaining} onTick={handleOnTick} />

      <h4>¿Qué vas a hacer hoy?</h4>
      <input onKeyUp={handleKeyUp} />

      <span style={divider} />

      <TaskList tasks={tasks} onRemoveTask={handleRemoveTask} onStartPomodoro={handleStartPomodoro} onStopPomodoro={handleStopPomodoro}/>
    </div>
  );
}

const style = {
  margin: "2rem auto",
  maxWidth: "600px",
  textAlign: "center"
}

const divider = {
  margin: "2rem auto",
  display: "block",
  height: "1px",
  background: "#ccc",
  width: "75px",
}

export default App;
