import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task, CreateTaskRequest, UpdateTaskRequest, ApiResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly baseUrl = 'https://to-do-list-defazio.up.railway.app/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtener todas las tareas
   * @returns Observable con array de tareas
   */
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/allTasks`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crear una nueva tarea
   * @param task Datos de la tarea a crear
   * @returns Observable con la tarea creada
   */
  createTask(task: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/createTask`, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualizar una tarea existente
   * @param id ID de la tarea a actualizar
   * @param task Datos actualizados de la tarea
   * @returns Observable con la tarea actualizada
   */
  updateTask(id: string, task: UpdateTaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/updateTask/${id}`, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Eliminar una tarea
   * @param id ID de la tarea a eliminar
   * @returns Observable con la tarea eliminada
   */
  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/deleteTask/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Verificar el estado del servidor
   * @returns Observable con el estado del servidor
   */
  getHealthStatus(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/health')
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Manejo centralizado de errores HTTP
   * @param error Error HTTP
   * @returns Observable con error manejado
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta. Verifica los datos enviados.';
          break;
        case 401:
          errorMessage = 'No autorizado. Verifica tus credenciales.';
          break;
        case 403:
          errorMessage = 'Acceso prohibido. No tienes permisos para esta acción.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 409:
          errorMessage = 'Conflicto. El recurso ya existe.';
          break;
        case 422:
          errorMessage = 'Datos de entrada inválidos.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intenta más tarde.';
          break;
        case 503:
          errorMessage = 'Servicio no disponible. El servidor está temporalmente fuera de servicio.';
          break;
        default:
          errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
      }
    }

    console.error('Error en TaskService:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Método de utilidad para formatear fechas
   * @param date Fecha a formatear
   * @returns Fecha formateada como string
   */
  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Método de utilidad para validar datos de tarea
   * @param task Datos de la tarea a validar
   * @returns true si los datos son válidos
   */
  validateTask(task: CreateTaskRequest | UpdateTaskRequest): boolean {
    if (!task) return false;
    
    // Validar título si está presente
    if ('title' in task && task.title !== undefined) {
      if (typeof task.title !== 'string' || task.title.trim().length === 0) {
        return false;
      }
    }
    
    // Validar descripción si está presente
    if ('description' in task && task.description !== undefined) {
      if (typeof task.description !== 'string') {
        return false;
      }
    }
    
    // Validar completed si está presente
    if ('completed' in task && task.completed !== undefined) {
      if (typeof task.completed !== 'boolean') {
        return false;
      }
    }
    
    return true;
  }
}
