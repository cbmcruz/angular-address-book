import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  messages!: string[];

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  /**
   * Populates the messages
   */
  getMessages(): void {
    this.messages = this.messageService.messages;
  }

  /**
   * Clears the messages
   */
  clearMessages(): void {
    this.messageService.clear();
    this.getMessages();
  }

  /**
   * Closes the message window
   */
  close(): void {
    this.childEvent.emit();
  }
}
