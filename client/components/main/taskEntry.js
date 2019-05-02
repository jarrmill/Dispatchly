import React from 'react';
import Button from 'react-bootstrap/Button';

export default function TaskEntry(props) {
  const { task } = props;

  return (task && task.title && task.task_status !== 'Complete') ?
    (
      <div>
        <div>
          {task.title}
        </div>
        <div>
          {task.createdAt}
        </div>
        <Button size="sm" variant="success" onClick={() => props.handleCompleteTask(task.title)}>
          Done!
        </Button>
      </div>
    ) 
    :
    (
      null
    )
}