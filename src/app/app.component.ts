import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Address Book';
  showingDebugMessages = false;

  toggleDebugMessages(): void {
    this.showingDebugMessages = !this.showingDebugMessages;
  }
}
