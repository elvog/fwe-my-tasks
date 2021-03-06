import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const DeleteLabelForm: React.FC<{ afterSubmit: () => void}> = ({
  afterSubmit,
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

    //getting all labels from database
    const taskRequest = await fetch("/api/labels", {
      headers: { "Content-Type": "application/json" },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();

      for (let i = 0; i < Object.keys(taskJSON.data).length; i++) {
        if (taskJSON.data[i].name === values.name) {
          await fetch(`/api/labels/${taskJSON.data[i].labelId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          afterSubmit();
          return;
        }
      }
    }
    alert("label doesn't exist");
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
      <Button type="submit" data-testid="deleteLabel">Delete label</Button>
    </form>
  );
};
