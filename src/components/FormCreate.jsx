import { Form, useActionData } from "react-router-dom";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import { useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";

function FormCreate({ user }) {
  const { addDoc } = useFirestore();

  const userData = useActionData();
  useEffect(() => {
    if (userData) {
      const newDoc = {
        ...userData,
        completed: userData.completed == "on" ? true : false,
        uid: user.uid,
      };
      addDoc(newDoc);
    }
  }, [userData]);
  return (
    <Form method="post" className="space-y-4">
      <FormInput type="text" label="Add Task" name="title" />
      <FormCheckbox name="completed" />
      <button className="">
        Add
      </button>
    </Form>
  );
}

export default FormCreate;
