import { Router } from "express";
import { Todo } from "../models/todo";

type RequestBody = {
  text: string;
};

type RequestParam = {
  todoId: string;
};

let todos: Todo[] = [];

const router = Router();

router.get("/todos", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: makeid(3),
    text: body.text,
  };
  todos.push(newTodo);
  res
    .status(201)
    .json({ message: "Todo created", todos: todos, newTodo: newTodo });
});

router.put("/todo/:todoId", (req, res, next) => {
  const body = req.body as RequestBody;
  const param = req.params as RequestParam;
  const todoId = param.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "Todo updated", todos: todos });
  }
  res.status(404).json({ message: "Todo not found!" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const param = req.params as RequestParam;
  const todoId = param.todoId;
  todos = todos.filter((todoItem) => todoItem.id !== todoId);
  res.status(200).json({ message: "Todo deleted", todos: todos });
});

function makeid(length: number) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default router;
