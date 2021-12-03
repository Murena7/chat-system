import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '@core/auth/auth.service';
import { IUser } from '@core/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { AuthenticationComponent } from '@shared/modals/authentication/authentication.component';
import { UserService } from '@core/api-services/user.service';
import { IMessage } from '@core/interfaces/chat.interface';
import { ChatSocketService } from '@core/socket-services/chat-socket.service';
import { ChatService } from '@core/api-services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ChatSocketService],
})
export class HomeComponent implements OnInit, OnDestroy {
  public authSub: Subscription;
  public currentUser: IUser | undefined;
  listeners: Subscription[] = [];

  messages: IMessage[] = [];
  chatForm = this.fb.group({
    textarea: [null, [Validators.required, Validators.maxLength(500)]],
  });

  @ViewChild('chat') private chatContainer!: ElementRef;
  chatScrollPosition: number = 0;

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    public authService: AuthService,
    private userService: UserService,
    private chatSocketService: ChatSocketService,
    private chatService: ChatService,
  ) {
    this.authSub = this.authService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {
    this.initListeners();
    this.chatService.getHistory().subscribe(data => {
      this.messages.push(...data);
      this.scrollToBottom();
    });
  }

  initListeners(): void {
    this.listeners.push(
      ...[
        this.chatSocketService.$chatMessages().subscribe(res => {
          const data = res.data!;
          this.messages.push(...data);
          this.scrollToBottom();
        }),
      ],
    );
  }

  sendMessage(): void {
    if (!this.currentUser?.id) {
      this.auth();
      return;
    }

    this.chatForm.get('textarea')?.markAsDirty();
    if (this.chatForm.valid) {
      const text = this.chatForm.get('textarea')?.value;

      this.chatSocketService.emitMesage({ text });

      const message: IMessage = {
        user: this.currentUser,
        text,
      };
      this.messages.push(message);
      this.chatForm.reset();

      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatContainer.nativeElement.scroll({
          top: this.chatContainer.nativeElement.scrollHeight,
          left: 0,
          behavior: 'smooth',
        });
      }, 100);
    } catch (err) {}
  }

  auth(): void {
    const ref = this.dialogService.open(AuthenticationComponent, {
      transitionOptions: '100ms ease-in',
      header: 'Authentication',
      closable: true,
      showHeader: true,
      dismissableMask: true,
    });

    ref.onClose.subscribe(res => {
      if (res) {
        this.listeners.forEach(x => x.unsubscribe());
        this.chatSocketService.destroy();
        this.chatSocketService.connectToRoom();
        this.initListeners();
      }
    });
  }

  logout(): void {
    this.userService.logout().subscribe(res => {});
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.chatSocketService.destroy();
    this.listeners.forEach(x => x.unsubscribe());
  }
}
