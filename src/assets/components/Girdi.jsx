import React, { useState, useEffect } from "react";

export default function GirdiKismi() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Yüklenirken localStorage'dan veri çek
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todoList"));
    const savedTheme = localStorage.getItem("theme");

    if (savedTodos) setTodoList(savedTodos);
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Her todoList değiştiğinde localStorage'a yaz
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Tema değiştiğinde localStorage'a yaz
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Todo ekle
  const handleAddTodo = () => {
    if (todo.trim() === "") return;
    setTodoList(prev => [...prev, todo.trim()]);
    setTodo("");
  };

  

  // Todo sil
  const handleDeleteTodo = (index) => {
    const updated = [...todoList];
    updated.splice(index, 1);
    setTodoList(updated);
  };

  return (
    <div className={darkMode ? "container dark" : "container light"}>
        {/* Tema Butonu */}
      <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1>Mini Todo List</h1>

      {/* Input ve Ekle Butonu */}
      <div className="input-container">
        <input
          type="text"
          name="tod"
          placeholder="Görev Giriniz"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          
        />
        <button onClick={handleAddTodo}>+</button>
      </div>

      

      {/* Todo Listesi */}
      <ul className="todo-list">
        {todoList.length === 0 && <li>Henüz görev yok.</li>}
        {todoList.map((item, index) => (
          <li key={index}>
            {item}
            <button className="delete-btn" onClick={() => handleDeleteTodo(index)}>
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
