import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    // Reemplaza 'http://localhost:3333' con la URL de tu servidor AdonisJS si es diferente
    this.socket = io('http://localhost:3333');
  }

  // Métodos para emitir eventos
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // Métodos para escuchar eventos
  on(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
  }

  // Método para desconectar el socket
  disconnect() {
    this.socket.disconnect();
  }
}
