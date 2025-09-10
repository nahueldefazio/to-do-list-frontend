import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: CreateTaskRequest = {
    title: '',
    description: '',
    completed: false
  };
  isLoading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Cargar todas las tareas
   */
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
        console.error('Error al cargar tareas:', error);
      }
    });
  }

  /**
   * Crear una nueva tarea
   */
  createTask(): void {
    if (!this.taskService.validateTask(this.newTask)) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.unshift(task); // Agregar al inicio de la lista
        this.newTask = { title: '', description: '', completed: false }; // Resetear formulario
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
        console.error('Error al crear tarea:', error);
      }
    });
  }

  /**
   * Cambiar el estado de completado de una tarea
   */
  toggleTaskStatus(task: Task): void {
    if (!task._id) return;

    this.isLoading = true;
    const updateData: UpdateTaskRequest = {
      completed: !task.completed
    };

    this.taskService.updateTask(task._id, updateData).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t._id === task._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
        console.error('Error al actualizar tarea:', error);
      }
    });
  }

  /**
   * Eliminar una tarea
   */
  deleteTask(id: string): void {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== id);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
        console.error('Error al eliminar tarea:', error);
      }
    });
  }

  /**
   * Formatear fecha para mostrar
   */
  formatDate(date: Date | string | undefined): string {
    if (!date) return 'Fecha no disponible';
    return this.taskService.formatDate(date);
  }

  /**
   * TrackBy function para optimizar el rendimiento de *ngFor
   */
  trackByTaskId(index: number, task: Task): string {
    return task._id || index.toString();
  }
}
