import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
import { MatCardAvatar } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { TranslationService } from '../services/translation.service';
import { FlashcardModalComponent } from '../dialog/flashcard-modal/flashcard-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
selector: 'app-chat',
standalone: true,
imports: [MatCardModule, MatButtonModule, MatIcon, MatInputModule, MatFormFieldModule, FormsModule, CommonModule, MatCardAvatar , MatTooltip, FlashcardModalComponent],
templateUrl: './chat.component.html',
styleUrls: ['./chat.component.css']
})
export class ChatComponent {
@Output() closeChat = new EventEmitter<void>(); // Event emitter for closing the chat
@Input() decks: any[] = []; // Accept the list of decks from app.component
isEnlarged: boolean = false; // Track whether the chat box is enlarged

messages: { text: string; isUser: boolean }[] = [];
newMessage: string = ''; // Bound to the text field
introduction: string = 'Hola! Soy tu asistente de IA. ¿Cómo puedo ayudarte hoy?'; // Introduction message
currentSelection: any = '';

constructor(private chatService: ChatService, private translationService: TranslationService, private dialog: MatDialog) {}

ngOnInit() {
  this.messages.push({ text: this.introduction, isUser: false }); // Push the introduction message to the chat
}

sendMessage() {
  if (!this.newMessage.trim()) return;

  this.messages.push({ text: this.newMessage, isUser: true });

  this.chatService.sendMessage(this.newMessage).subscribe({
    next: (response) => {
      this.messages.push({ text: response, isUser: false });
      this.newMessage = ''; // Clear the input
    },
    error: (err: any) => {
      console.error('Chat error:', err);
      this.messages.push({ text: 'Error: Could not get response', isUser: false });
    }
  });
}

onBotMessageMouseUp(event: MouseEvent, message: string): void {
  const selection = window.getSelection()?.toString().trim();
  if (selection) {
    console.log('Selected text:', selection); // Debug statement
    this.translationService.translateText(selection).subscribe({
      next: (translation: any) => {
        console.log('Translation:', translation); // Debug statement

        // Open the flashcard modal dialog
        const dialogConfig = new MatDialogConfig();
        dialogConfig.panelClass = 'my-dialog-styles'; // Apply custom class
        dialogConfig.width = '40%';
        dialogConfig.height = '70%';
        dialogConfig.maxHeight = '900vh';
        dialogConfig.maxWidth = '900vw';
        dialogConfig.autoFocus = '.modal-header'; // Focus the modal header element
        dialogConfig.data = { text: selection, definition: translation, decks: this.decks }; // Pass the selection, translation, and decks

        const dialogRef = this.dialog.open(FlashcardModalComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Flashcard added:', result); // Debug statement
          } else {
            console.log('Flashcard modal closed without result'); // Debug statement
          }
        });
      },
      error: (err: any) => {
        console.error('Translation error:', err);
        this.messages.push({ text: 'Error: Could not translate text', isUser: false });
      }
    });
  }
}

onClose(): void {
  this.closeChat.emit(); // Emit the close event
}

toggleEnlarge(): void {
  this.isEnlarged = !this.isEnlarged; // Toggle the enlarged state
}
}

