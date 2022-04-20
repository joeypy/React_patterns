import "./styles.css";
import { LikeButton } from "./ControlProps/LikeButton";
import { useState } from "react";
import { FormWithHoc } from "./PropsGetters/Form";
import { Todo } from "./CCP/Todo";

export default function App() {
  const [counter, setCounter] = useState(0);

  const handleCounter = () => {
    setCounter(counter + 5);
  };

  const onSubmit = (values: any) => alert(JSON.stringify(values));

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <hr />

      <h2>Compound Component Pattern!</h2>
      <Todo>
        <Todo.Title>
          <h2>My todo list</h2>
        </Todo.Title>
        <Todo.Form />
        <Todo.List />
      </Todo>
      <hr />

      <h2>Control Props!</h2>
      <LikeButton />
      <LikeButton value={counter} setValue={handleCounter} />

      <hr />
      <h2>Ejemplo con Props Getters y HOC</h2>
      <FormWithHoc onSubmit={onSubmit} />
    </div>
  );
}
