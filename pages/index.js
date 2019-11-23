import React, { useState, useReducer } from 'react';
import TaskList from "../components/TaskList";
import Timer from "../components/Timer";
import pomodoroReducer from "../utils/pomodoroReducer";
import useStoredState from "../utils/useStoredState";
import useStoredReducer from "../utils/useStoredReducer";
import showNotification from "../utils/showNotification";
import uuidv4 from "uuid/v4";

const Home = () => {
  const [tasks, setTasks] = useStoredState("tasks", []);
  const [pomodoro, dispatch] = useStoredReducer("pomodoro", pomodoroReducer, { count: 0 });

  function addNewPomodoroToTask(taskId, pomodoroRemaining) {
    if (pomodoro.state === "break") return;

    const index = tasks.findIndex(function(task) {
      return task.uuid === taskId;
    });

    setTasks([
      ...tasks.slice(0, index),
      {...tasks[index], ...{ pomodoros: [...tasks[index].pomodoros, { uuid: pomodoro.uuid, finishTo: pomodoro.finishTo, remaining: pomodoroRemaining }] }},
      ...tasks.slice(index + 1)
    ]);
  }

  function handleStartPomodoro(uuid) {
    dispatch({ type: 'START_POMODORO', taskId: uuid });
  }

  function handleStopPomodoro(uuid) {
    addNewPomodoroToTask(uuid, pomodoro.remaining);
    dispatch({ type: 'CANCEL_POMODORO' });
  }

  function handleOnTick() {
    const now = Date.now();

    if(pomodoro.isRunning) {
      if(parseInt(pomodoro.finishTo) > now) {
        dispatch({ type: 'TICK_POMODORO', now });
      } else {
        if (pomodoro.state !== "break") {
          showNotification("El pomodoro ha acabado!");
        } else {
          showNotification("La pausa ha terminado!");
        }

        addNewPomodoroToTask(pomodoro.taskId, 0);
        dispatch({ type: 'FINISH_POMODORO' });
      }
    }
  }

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
    <div className="home">
      <Timer running={pomodoro.isRunning} milliseconds={pomodoro.remaining} onTick={handleOnTick} />

      <h4>¿Qué vas a hacer hoy?</h4>
      <input onKeyUp={handleKeyUp} />

      <span className="divider" />

      <TaskList running={pomodoro.isRunning} tasks={tasks} onRemoveTask={handleRemoveTask} onStartPomodoro={handleStartPomodoro} onStopPomodoro={handleStopPomodoro}/>

      <style jsx>{`
      .home {
        margin: 2rem auto;
        max-width: 600px;
        text-align: center;
      }
      .divider {
        margin: 2rem auto;
        display: block;
        height: 1px;
        background: #ccc;
        width: 75px;
      }
    `}</style>
    </div>
  );
};

export default Home;
