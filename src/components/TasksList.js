import React, { Fragment, useContext, useEffect } from 'react';
import Task from './Task';
import CreateTaskButton from './button/CreateTaskButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TasksContext from '../context/tasks/tasksContext';

const TasksList = () => {
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    tasksContext.getTasks();
    // eslint-disable-next-line
  }, []);

  const shownTasks = tasksContext.search.text ? tasksContext.search.tasks : tasksContext.tasks;

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    tasksContext.reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <Fragment>
      <CreateTaskButton />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {shownTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <Task
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      color={task.color}
                      innerRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

export default TasksList;
