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

  getMessages(): void {
    this.messages = this.messageService.messages;
  }

  clearMessages(): void {
    this.messageService.clear();
    this.getMessages();
  }

  close(): void {
    this.childEvent.emit();
  }
}
