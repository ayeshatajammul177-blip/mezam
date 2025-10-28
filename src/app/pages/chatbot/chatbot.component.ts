import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot',
  standalone: false,
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  selectedModel: string = 'formalize';
  userInput: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Initial greeting message when chatbot opens
    this.messages.push({
      text: `👋 Hey! You are in "${this.selectedModel}" mode. How can I help you today?`,
      sender: 'bot'
    });
  }
  
  onModeChange(newMode: string) {
    this.selectedModel = newMode;
    this.messages = [];
    // Reset conversation and add fresh greeting
    this.ngOnInit();

    console.log(`Switched to ${newMode} mode. Messages reset.`);
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Display user message
    this.messages.push({ text: this.userInput, sender: 'user' });
    const messageToSend = this.userInput;
    this.userInput = '';

    // Call backend chatbot API
    this.chatService.sendMessage(messageToSend, this.selectedModel).subscribe({
      next: (response) => {
        const botReply =
          response?.reply || response?.message || '🤖 (No reply from bot)';
        this.messages.push({ text: botReply, sender: 'bot' });
      },
      error: (err) => {
        console.error('Chat error:', err);
        const errorMsg =
          err.status === 400
       ? '❌ Unauthorized! Please log in again.'
      : `⚠️ ${err.error?.message || 'Error connecting to chatbot.'}`;
        this.messages.push({ text: errorMsg, sender: 'bot' });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
