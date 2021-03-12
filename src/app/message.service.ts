import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  /**
   * Adds a new message
   * @param message - the message to add
   */
  add(message: string) {
    this.messages.push(message);
  }

  /**
   * Clears all messages
   */
  clear() {
    this.messages = [];
  }
}
