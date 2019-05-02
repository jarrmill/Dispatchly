import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dateFns from 'date-fns';

export default function TaskEntry(props) {
  const { task } = props;
  let time = dateFns.parse(task.created_at);
  time = new Date(time);
  time = dateFns.addHours(time, 1);
  const timeSince = dateFns.distanceInWordsToNow(new Date(time));
  return (task && task.title && task.task_status !== 'Complete') ?
    (
      <div style={{paddingTop: '5px'}}>
        <Card>
          <Card.Body>
            <Card.Title>
              {task.division}
            </Card.Title>
            <Card.Subtitle>
              {`About ${timeSince} ago`}
            </Card.Subtitle>
            <Card.Text>
              {task.title}
            </Card.Text>
            <Button size="sm" variant="success" onClick={() => props.handleCompleteTask(task.title)}>
              Done!
            </Button>
          </Card.Body>
        </Card>
      </div>
    ) 
    :
    (
      null
    )
}