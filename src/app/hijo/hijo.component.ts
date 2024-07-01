
import { SocketService } from '../socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
;
@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  newMessage: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // Escuchar el evento de 'message' del servidor
    this.socketService.on('message', (message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Emitir el evento 'message' al servidor
      this.socketService.emit('message', this.newMessage);
      this.newMessage = '';
    }
  }

  ngOnDestroy() {
    // Desconectar el socket al destruir el componente
    this.socketService.disconnect();
  }
}
