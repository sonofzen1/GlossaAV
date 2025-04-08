import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  message: string = ''; // The message to be sent
  messages: string[] = []; // Array to hold the chat messages

  constructor() {}

  sendMessage(): void {
    if (this.message.trim()) { // Check if the message is not empty
      this.messages.push(this.message); // Add the message to the array
      this.message = ''; // Clear the input field
    }
  }
  clearMessages(): void {
    this.messages = []; // Clear the chat messages  
  }
}
