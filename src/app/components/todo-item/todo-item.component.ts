import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
	selector: 'todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
	@Input() todo:Todo;
	@Output() deleteTodo:EventEmitter<Todo> = new EventEmitter;

	constructor(private todoService:TodoService) { }

	ngOnInit() {
	}

	//set dynamic classes
	setClasses() {
		let classes = {
			todo: true,
			'is-complete': this.todo.completed,
		}
		return classes;
	}

	//toggle completion status
	onToggle(todo:Todo) {
		//local toggle
		todo.completed = !todo.completed;

		//remote toggle
		this.todoService.toggleCompleted(todo).subscribe((todo) => {
			console.log(todo)
		})
	}

	//delete TodoItem
	onDelete(todo:Todo) {
		this.deleteTodo.emit(todo);
	}
}
