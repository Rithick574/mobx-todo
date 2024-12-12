import { observer } from "mobx-react";
import todoStore from "./store/TodoStore";
import { useEffect, useState } from "react";
import { autorun, reaction } from "mobx";

const App = observer(() => {
  const [showCongrats, setShowCongrats] = useState(false);

  // useEffect(() => {
  //   autorun(() => {
  //     console.log(todoStore.completedCount);
  //     console.log(todoStore.todos);
  //   });
  // }, []);

  useEffect(() => {
    reaction(
      () => todoStore.completedCount,
      (completedCount) => {
        if (completedCount === todoStore.todos.length) {
          setShowCongrats(true);
        } else {
          setShowCongrats(false);
        }
      }
    );
  }, []);
  return (
    <div>
      <h1>{showCongrats && "Congratulations , all your tasks are done"}</h1>
      <h2>Completed tasks{todoStore.completedCount}</h2>
      <input
        type="text"
        value={todoStore.currentTodoText}
        onChange={(e) => (todoStore.currentTodoText = e.target.value)}
      />
      <button
        onClick={() => {
          todoStore.addTodo();
        }}
      >
        add Todo
      </button>
      {todoStore.todos.map((todo) => (
        <div
          key={todo.id}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => (todo.completed = !todo.completed)}
          />
          {todo.title}
        </div>
      ))}
    </div>
  );
});

export default App;
