import React from "react";
import useStoredState from "../utils/useStoredState";

function TaskList(props) {
  const { running, tasks, onRemoveTask, onFinishTask, onStartPomodoro, onStopPomodoro } = props;
  const [taskStarted, setTaskStarted] = useStoredState("taskStarted", null);

  function handleMouseDown(uuid, event) {
    if (event.button === 1)
      onRemoveTask(uuid);
  }

  function handleStop(uuid) {
    onStopPomodoro(uuid);
    setTaskStarted(null);
  }

  function handleStart(uuid) {
    if (running) onStopPomodoro(taskStarted);
    onStartPomodoro(uuid);
    setTaskStarted(uuid);
  }

  function handleFinishTask(uuid) {
    onFinishTask(uuid);
  }

  return (
    <div className="container">
      {tasks.map(task => (
        <div className="item" key={task.uuid} onMouseDown={event => handleMouseDown(task.uuid, event)}>
          <p className="title tooltip" title={task.title}>{task.title}</p>
          <div className="footer">
            <span className="badge finished">{task.pomodoros.filter(pomodoro => pomodoro.remaining === 0).length}</span>
            <span className="badge canceled">{task.pomodoros.filter(pomodoro => pomodoro.remaining > 0).length}</span>
            {(task.uuid === taskStarted) && running ? (
              <button className="button" onClick={() => handleStop(task.uuid)}>Stop</button>
            ) : (
              <button className="button" onClick={() => handleStart(task.uuid)}>Start</button>
            )}
            <button className="button" disabled={taskStarted === task.uuid} onClick={() => handleFinishTask(task.uuid)}>Done</button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        .item {
          display: flex;
          padding: 1rem;
          border: 1px solid #ccc;
          margin-bottom: 0.5rem;
          justify-content: space-between
        }
        .item > *:not(:last-child) {
          margin-right: 1rem;
        }
        .item .title {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .item .footer {
          display: flex;
          align-items: center;
        }
        .badge {
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          padding: .15rem .35rem;
          border-radius: 50%;
        }
        .badge.finished {
          background: #88ba6a;
          margin-right: .25rem;
        }
        .badge.canceled {
          background: #fc6a6a;
          margin-right: 1rem;
        }
        .button {
          cursor: pointer;
          color: #444;
          background: #ccc;
          border: 1px solid #bbb;
          padding: .25rem .5rem;
          min-width: 50px
        }
        .button[disabled] {
          color: #999;
        }
    `}</style>
    </div>
  );
}

export default TaskList;
