import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const AddLabelToTaskForm: React.FC<{ afterSubmit: () => void, taskId: string }> = ({
  afterSubmit,
  taskId,
}) => {
  const [values, setValues] = useState({
    name: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    /**
     * get all labels from database
     */
    const taskRequest = await fetch("/api/labels", {
      headers: { "Content-Type": "application/json" },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();

      for (let i = 0; i < Object.keys(taskJSON.data).length; i++) {
        if (taskJSON.data[i].name === values.name) {
          await fetch(`/api/tasks/${taskId}/labels`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "labelIdList": [taskJSON.data[i].labelId]
            }),
          });
          afterSubmit();
          return;
        }
      }
    }
    alert("label doesn't exist\ncreate it in dashboard");
    afterSubmit();
  };
  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name="name"
        type="text"
        label="Name"
        onChange={fieldDidChange}
        autoComplete="off"
        required
      />
      <Button type="submit" data-testid="addLabelToTask">Add label</Button>
    </form>
  );
};
