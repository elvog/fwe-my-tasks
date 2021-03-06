import React, { useEffect } from "react";
import styled from "styled-components";
import { SmallButton } from "../../../components/SmallButton";
import { DeleteButton } from "../../../components/DeleteButton";
import { msToHMS } from "../../../util/CalculateDate";

export type Label = {
  labelId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Tracking = {
  trackingId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  timeStart: Date;
  timeEnd: Date;
};

export type Task = {
  taskId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  labels: Label[];
  __trackings__: Tracking[];
};



export const LabelList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;
  padding-left: 0;
  
  align-self: flex-end;
  display: block;
  & > li {
    margin-right: 0.5rem;
    margin-top: 0.25rem;
    padding: 0.125rem;
    float: left;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #333;
  }
`;

export const LabelsSpan = styled.span`
  float: left;
  margin-right: 0.5rem;
`

export const TaskFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TaskItemStyle = styled.li`
  margin: 0;
  min-height: 9rem;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${TaskHighlight} {
      display: block;
    }
  }
`;
export const TaskList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TaskItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;
export const TaskTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  float: left;
`;

export const TaskDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  margin-top: 2rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Label = styled.p` 
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0.5rem; 
`;

export const LabelItem = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
`;

export const TrackedTime = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0.5rem;
  clear: both;
`;


export const TaskValue = styled.span`
  white-space: nowrap;
`;
export type TaskItemProps = {
  task: Task;
  props: any;
  onChange: any;
  fetchTasks: () => void;
  onClick?: (task: Task) => void;
};
/**
 * Task item for task list
 * @param {
 *   task,
 *   props,
 *   onChange,
 *   fetchTasks,
 *   onClick = () => { },
 * }
 */
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  props,
  onChange,
  fetchTasks,
  onClick = () => { },
}) => {
  const { taskId, name, description, labels, __trackings__ } = task;


  /**
   * deletes task from database
   */
  const onClickDeleteButton = async function () {
    await fetch("/api/tasks/" + taskId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchTasks();
  };


  /**
   * returns date difference from startDate and current date to form "XX:XX:XX"
   */
  const getDateDifference = function (): string {
    const ms = __trackings__.reduce((prev: any, cur: any) => {
      const timeStart = new Date(cur.timeStart);
      const timeEnd = new Date(cur.timeEnd);
      const diff = (timeEnd.getTime() - timeStart.getTime());

      return diff + prev;
    }, 0);
    return msToHMS(ms);
  }

  return (
    <TaskItemStyle data-testid={"task-item" + task.name}>
      <TaskHighlight />
      <TaskFlex data-testid={"task-onClick" + task.name} onClick={() => {
        onClick(task);
      }}>
        <div>
          <TaskTitle>{name}</TaskTitle>
          <TaskDescription>{description}</TaskDescription>
          <Label>
            <LabelsSpan>Labels:</LabelsSpan>
            <LabelList>
              {labels &&
                labels.map((label: Label) => {
                  return <li key={label.labelId}>{label.name}</li>;
                })}
            </LabelList>
          </Label>
          <TrackedTime>Total tracked time: {
            getDateDifference()
          }</TrackedTime>

        </div>
      </TaskFlex>
      <div>
        <SmallButton data-testid={"start-timer-button" + task.name} disabled={props.taskId.toString() == taskId || props.taskId.toString() == 0 ? false : true}
          onClick={() => {
            if (!(props.taskId.toString() == taskId)) {
              onChange({ taskId: taskId, name: name });
              localStorage.setItem("currentTaskTimerLS", JSON.stringify({ taskId: taskId, name: name }));
            } else {
              onChange({ taskId: 0, name: "" });
              localStorage.setItem("currentTaskTimerLS", JSON.stringify({ taskId: 0, name: "" }));
              localStorage.setItem("trackingStartDateLS", "");
              localStorage.setItem("trackingPauseLS", "false");
              localStorage.setItem("trackingDescriptionLS", "");
            }
          }}>{props.taskId.toString() == taskId ? "cancel" : "Start timer"}</SmallButton>
        <DeleteButton data-testid={"delete-task-button" + task.name} onClick={() => {
          onClickDeleteButton();
        }}>Delete task</DeleteButton>
      </div>
    </TaskItemStyle>
  );
};
