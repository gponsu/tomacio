import React from 'react';
import TaskList from "../components/TaskList";
import Timer from "../components/Timer";
import Statistic from "../components/Statistic";
import pomodoroReducer from "../utils/pomodoroReducer";
import useStoredState from "../utils/useStoredState";
import useStoredReducer from "../utils/useStoredReducer";
import showNotification from "../utils/showNotification";
import { pomodorosToday, timeToday } from "../utils/pomodoroStats";
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

  function handleFinishTask(taskId) {
    const index = tasks.findIndex(function(task) {
      return task.uuid === taskId;
    });

    setTasks([
      ...tasks.slice(0, index),
      {...tasks[index], status: "finished" },
      ...tasks.slice(index + 1)
    ]);
  }

  return (
    <div className="home">
      <Timer running={pomodoro.isRunning} milliseconds={pomodoro.remaining} onTick={handleOnTick} />

      <h4>What are you going to do today?</h4>
      <input onKeyUp={handleKeyUp} />

      <span className="divider" />

      <TaskList
        running={pomodoro.isRunning}
        tasks={tasks.filter(task => task.status !== "finished")}
        onRemoveTask={handleRemoveTask}
        onStartPomodoro={handleStartPomodoro}
        onStopPomodoro={handleStopPomodoro}
        onFinishTask={handleFinishTask}
      />

      <span className="divider" />

      <div className="statistics">
        <Statistic donut title="Pomodoros" data={pomodorosToday(tasks)} />
        <Statistic title="Time" data={timeToday(tasks)} />
      </div>

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
      .statistics {
        display: flex;
        flex-direction: column;
      }
      .statistics > *:not(:last-child) {
        margin-bottom: 1rem;
      }
      @media (min-width: 568px) {
        .statistics {
          flex-direction: row;
        }
        .statistics > *:not(:last-child) {
          margin-right: 1rem;
          margin-bottom: 0;
        }
      }
    `}</style>
    </div>
  );
};

export default Home;
