import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  all: number = 0;
  active: number = 0;
  completed: number = 0;
  newTask: any = '';
  taskList: string[] = [];

  addNewTask () {
    const trimmedTask = this.newTask.trim();

      // Prevent empty or duplicate tasks
    if (trimmedTask && !this.taskList.includes(trimmedTask)) {
      this.taskList.push(trimmedTask);
      this.newTask = '';
      this.updateTaskCounts();
    }
  }

  updateTaskCounts() {
    this.all = this.taskList.length;
    this.active = this.taskList.length; // if you're not tracking completed separately
    this.completed = 0; // update based on real logic later
  }


}
