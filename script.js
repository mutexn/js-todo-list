"use strict";

const storage = localStorage;
const todo = document.getElementById("todo");
const priority = document.querySelector("select");
const deadline = document.querySelector('input[type="date"]');
const submit = document.getElementById("submit");
const table = document.querySelector("table");
const item = {};
const list = [];

submit.addEventListener("click", () => {
  if (todo.value === "") {
    item.todo = "Empty";
  } else {
    item.todo = todo.value;
  }

  item.priority = priority.value;

  if (deadline.value === "") {
    const date = new Date();
    item.deadline = date.toLocaleDateString();
  } else {
    item.date = deadline.value;
  }
  item.done = false;

  addItem(item);

  todo.value = "";
  priority.value = "普";
  deadline.value = "";
});

const addItem = (item) => {
  const tr = document.createElement("tr");

  for (const prop in item) {
    const td = document.createElement("td");
    if (prop === "done") {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item[prop];
      td.appendChild(checkbox);
    } else {
      td.textContent = item[prop];
    }
    tr.appendChild(td);
  }

  table.appendChild(tr);
  list.push(item);
  storage.todoList = JSON.stringify(list);
};
