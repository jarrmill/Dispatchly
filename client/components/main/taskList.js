import React from 'react';
import TaskEntry from './TaskEntry'

export default function TaskList(props) {
  const { tasks, selectedOrganization } = props;
  const renderTasks = function() {
    if (selectedOrganization){
      const tasksList = tasks[selectedOrganization].map((task) => {
        return (
          <TaskEntry task={task} handleCompleteTask={props.handleCompleteTask}/>
        )
      });
      return tasksList;
    }
    else {
      //Either use has no orgs or data has been fetched yet. Return nothing.
      return null;
    }
  }
  return (
      <div>
        {renderTasks()}
      </div>
  );
}