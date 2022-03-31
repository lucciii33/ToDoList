import React, { useEffect } from "react";
import { TodoList } from "./todoList";

//create your first component
const Home = () => {
	return (
		<div className="container">
			<h1 className="title">Todo list</h1>
			<TodoList />
		</div>
	);
};

export default Home;
