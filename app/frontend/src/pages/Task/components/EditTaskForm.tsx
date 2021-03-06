import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Task } from "../../../pages/Dashboard/components/TaskList";

interface EditTaskFormState {
  taskId: string;
  name: string;
  description: string;
}

export const EditTaskForm: React.FC<{ afterSubmit: () => void; task: Task; }> = ({
  afterSubmit,
  task,
}) => {
  
  const [values, setValues] = useState<EditTaskFormState>(task);

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (format.test(e.target.value)) {
      alert("special character are not allowed!");
      e.target.value = "";
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    /** 
     * patch task in database
     */
    await fetch(`/api/tasks/${values.taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
      }),
    });
    afterSubmit();
  };
  
  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name="name"
        type="text"
        label="Name"
        onChange={fieldDidChange}
        value={values.name}
        autoComplete="off"
        required
      />
      <Input
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        value={values.description}
        autoComplete="off"
        required
      />
      <Button type="submit" data-testid="editTask">Save changes</Button>
    </form>
  );
};
