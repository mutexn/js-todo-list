"use strict";

const storage = localStorage;
const todo = document.getElementById("todo");
const priority = document.querySelector("select");
const deadline = document.querySelector('input[type="date"]');
const submit = document.getElementById("submit");
const table = document.querySelector("table");
const item = {};
let list = [];

// 登録ボタンクリック時のイベント
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
  list.push(item);
  storage.todoList = JSON.stringify(list);

  todo.value = "";
  priority.value = "普";
  deadline.value = "";
});

// itemオブジェクトから表に行を追加する
const addItem = (item) => {
  const tr = document.createElement("tr");

  for (const prop in item) {
    const td = document.createElement("td");
    if (prop === "done") {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item[prop];
      td.appendChild(checkbox);
      checkbox.addEventListener("change", checkBoxListener);
    } else {
      td.textContent = item[prop];
    }
    tr.appendChild(td);
  }

  table.appendChild(tr);
};

// リロード時、ローカルストレージから読み込んでリストを作成する
document.addEventListener("DOMContentLoaded", () => {
  const json = storage.todoList;
  if (json === undefined) {
    return;
  }

  list = JSON.parse(json);

  for (const item of list) {
    addItem(item);
  }
});

// ソートボタンの作成
const filterButton = document.createElement("button"); // ボタン要素を生成
filterButton.textContent = "優先度（高）で絞り込み";
filterButton.id = "priority"; // CSSでの装飾用
const main = document.querySelector("main");
main.appendChild(filterButton);

filterButton.addEventListener("click", () => {
  clearTable();

  for (const item of list) {
    if (item.priority === "高") {
      addItem(item);
    }
  }
});

// 表のヘッダー行を残して、その他の行を削除する
const clearTable = () => {
  const trList = Array.from(document.getElementsByTagName("tr"));
  trList.shift();
  for (const tr of trList) {
    tr.remove();
  }
};

// 削除ボタンの作成
const remove = document.createElement("button");
remove.textContent = "完了したTODOを削除する";
remove.id = "remove"; // CSS装飾用
const br = document.createElement("br"); // 改行したい
main.appendChild(br);
main.appendChild(remove);

remove.addEventListener("click", () => {
  clearTable();

  list = list.filter((item) => item.done === false);
  for (const item of list) {
    addItem(item);
  }

  storage.todoList = JSON.stringify(list);
});

const checkBoxListener = (ev) => {
  const trList = Array.from(document.getElementsByTagName("tr"));
  const currentTr = ev.currentTarget.parentElement.parentElement;
  const idx = trList.indexOf(currentTr) - 1;
  list[idx].done = ev.currentTarget.checked;
  storage.todoList = JSON.stringify(list);
};
