import React, { useState, useEffect } from "react";
const Form = () => {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });
  // ...
  return <button onClick={() => setName("")}>FormButton</button>;
};

const WrongForm = () => {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  // 🔴 We're breaking the first rule by using a Hook in a condition
  //   if (name !== "") {
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });
  //   }

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });
  // ...
  return <button onClick={() => setName("")}>WrongFormButton</button>;
};
export const DemoRules = () => {
  return (
    <>
      <Form />
      <WrongForm />
    </>
  );
};
