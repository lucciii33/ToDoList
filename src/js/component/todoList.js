import React, { useState, useEffect } from "react";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);
	const [newList, setNewList] = useState([]);

	function onChange(e) {
		const newValue = e.target.value;
		setInputValue(newValue);
	}
	// function Addtask(e) {
	// 	if (e.keyCode == 13) {
	// 		setList([...list, inputValue]);
	// 		setInputValue("");
	// 	}
	// }
	function handleRemove(id) {
		// setList(list.filter((remove, i) => i != index));
		fetch(
			"https://3000-lucciii33-todobackend-hfl0vndm945.ws-us38.gitpod.io/todo" +
				id,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		)
			.then((res) => res.json())
			.then((data) => setList(data))
			.catch((err) => console.log(err));
	}

	const fetchGet = async () => {
		const res = await fetch(
			"https://3000-lucciii33-todobackend-hfl0vndm945.ws-us38.gitpod.io/todo"
		);
		const data = await res.json();
		setList(data);
		console.log(data);
	};
	const addTask = (e) => {
		console.log();
		if (e.keyCode == 13) {
			fetch(
				"https://3000-lucciii33-todobackend-hfl0vndm945.ws-us38.gitpod.io/todo",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						label: inputValue,
						done: false,
					}),
				}
			)
				.then((res) => res.json())
				.then((data) => setList(data))
				.catch((err) => console.log(err));
			setInputValue("");
		}
	};

	useEffect(() => {
		fetchGet();
	}, []);
	return (
		<div>
			<input
				className="input"
				type="text"
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={addTask}
				value={inputValue}
			/>
			{/* <button onClick={() => addTask(task)}></button> */}
			<ul>
				{list.map((task, index) => {
					return (
						<li className="list" key={index}>
							{task.label}
							<span
								className="ms-3"
								onClick={() => handleRemove(task.id)}>
								<i className="fas fa-trash"></i>
							</span>
						</li>
					);
				})}
			</ul>
			<div>
				<em>
					{list.length == 0 ? "no tasks" : `${list.length} tasks `}
				</em>
			</div>
		</div>
	);
};
