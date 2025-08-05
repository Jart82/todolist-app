import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  all: number = 0;
  active: number = 0;
  completed: number = 0;
  newTask: string = '';
  filter: 'all' | 'active' | 'completed' = 'all';

  taskList: { text: string; completed: boolean }[] = [];

  editingIndex: number | null = null;
  editedText: string = '';

  constructor() {
    this.loadFromLocalStorage();
  }

  addNewTask() {
    const trimmedTask = this.newTask.trim();

    if (trimmedTask && !this.taskList.find(t => t.text === trimmedTask)) {
      this.taskList.push({ text: trimmedTask, completed: false });
      this.newTask = '';
      this.updateTaskCounts();
      this.saveToLocalStorage();
    }
  }

  toggleTaskCompletion(index: number) {
    this.taskList[index].completed = !this.taskList[index].completed;
    this.updateTaskCounts();
    this.saveToLocalStorage();
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1);
    this.updateTaskCounts();
    this.saveToLocalStorage();
  }

  setFilter(filterType: 'all' | 'active' | 'completed') {
    this.filter = filterType;
    this.saveToLocalStorage();
  }

  getFilteredTasks() {
    switch (this.filter) {
      case 'active':
        return this.taskList.filter(task => !task.completed);
      case 'completed':
        return this.taskList.filter(task => task.completed);
      default:
        return this.taskList;
    }
  }

  startEditing(index: number) {
    this.editingIndex = index;
    this.editedText = this.taskList[index].text;
  }

  cancelEditing() {
    this.editingIndex = null;
    this.editedText = '';
  }

  saveEditedTask(index: number) {
    const trimmed = this.editedText.trim();
    if (trimmed) {
      this.taskList[index].text = trimmed;
      this.editingIndex = null;
      this.editedText = '';
      this.saveToLocalStorage();
    }
  }

  updateTaskCounts() {
    this.all = this.taskList.length;
    this.completed = this.taskList.filter(t => t.completed).length;
    this.active = this.all - this.completed;
  }

  saveToLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
    localStorage.setItem('taskFilter', this.filter);
  }

  loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('taskList');
    const savedFilter = localStorage.getItem('taskFilter');

    if (savedTasks) {
      this.taskList = JSON.parse(savedTasks);
    }

    if (savedFilter === 'all' || savedFilter === 'active' || savedFilter === 'completed') {
      this.filter = savedFilter;
    }

    this.updateTaskCounts();
  }
}


