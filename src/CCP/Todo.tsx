import {
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

// Ejemplo de Compound Component Pattern

const TodoContext = createContext(null);

const { Provider } = TodoContext;

interface Props {
  children: ReactNode;
}

export const Todo = ({ children }: Props) => {
  const [listTodos, setListTodos] = useState({});

  const handleSubmit = (inputValue: string) => {
    setListTodos({
      ...listTodos,
      [inputValue]: { name: inputValue, isDone: false },
    });
  };

  const toogleTodo = (event: any) => {
    const { name } = event.target;
    setListTodos({
      ...listTodos,
      [name]: {
        // @ts-ignore
        ...listTodos[name],
        // @ts-ignore
        isDone: !listTodos[name].isDone,
      },
    });
  };

  const getTodoValues = () => Object.values(listTodos);

  const valuesProvider = {
    handleSubmit,
    toogleTodo,
    getTodoValues,
  };

  return (
    <div
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        transition: "0.3s",
        borderRadius: "5px",
        padding: "8px",
      }}
    >
      {/* @ts-ignore */}
      <Provider value={valuesProvider}>{children}</Provider>
    </div>
  );
};

export const TodoTitle = ({ children }: any) => <header>{children}</header>;

export const TodoForm = () => {
  const [inputValue, setInputValue] = useState("");

  //   @ts-ignore
  const { handleSubmit } = useContext(TodoContext);

  // @ts-ignore
  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const _handleSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={_handleSubmit}>
      <label>
        New todo:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export const TodoList = () => {
  // @ts-ignore
  const { toogleTodo, getTodoValues } = useContext(TodoContext);

  const list = getTodoValues();

  return (
    <ul>
      {/* @ts-ignore */}
      {list.map(({ name, isDone }) => (
        <li key={name}>
          <label>
            <input
              name={name}
              type="checkbox"
              checked={isDone}
              onChange={toogleTodo}
            />
            <span style={{ textDecoration: isDone ? "line-through" : "" }}>
              {name}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

Todo.List = TodoList;
Todo.Title = TodoTitle;
Todo.Form = TodoForm;
