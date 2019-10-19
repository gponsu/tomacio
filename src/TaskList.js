import React from "react";
import useStoredState from "./useStoredState";

function TaskList(props) {
	const { tasks, onRemoveTask, onStartPomodoro, onStopPomodoro } = props;
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
    onStartPomodoro(uuid);
    setTaskStarted(uuid);
  }

	return (
		<div style={style.container}>
			{tasks.map(task => (
        <div style={style.item} key={task.uuid} onMouseDown={event => handleMouseDown(task.uuid, event)}>
          {task.title}
          <div>
            <span style={style.badge}>{task.pomodoros.length}</span>
            {task.uuid === taskStarted ? (
              <button style={style.button} onClick={() => handleStop(task.uuid)}>Stop</button>
            ) : (
              <button style={style.button} onClick={() => handleStart(task.uuid)}>Start</button>
            )}
          </div>
        </div>
			))}
		</div>
	);
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
	},
	item: {
		display: "flex",
		padding: "1rem",
		border: "1px solid #ccc",
		marginBottom: "0.5rem",
		justifyContent: "space-between"
	},
  badge: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    padding: ".15rem .35rem",
    borderRadius: "50%",
    background: "#fc6a6a",
    marginRight: "1rem",
  },
	button: {
		cursor: "pointer",
		color: "#444",
		background: '#ccc',
		border: "1px solid #bbb",
		padding: ".25rem .5rem",
		minWidth: "50px"
	}
}

export default TaskList;
