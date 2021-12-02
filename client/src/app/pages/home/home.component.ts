import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '@core/auth/auth.service';
import { IUser } from '@core/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { AuthenticationComponent } from '@shared/modals/authentication/authentication.component';
import { UserService } from '@core/api-services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public authSub: Subscription;
  public currentUser: IUser | undefined;

  messages: string[] = ['12312', '123123'];
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
  ) {
    this.authSub = this.authService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {}

  sendMessage(): void {
    if (!this.currentUser?.id) {
      this.auth();
      return;
    }

    this.chatForm.get('textarea')?.markAsDirty();
    if (this.chatForm.valid) {
      this.messages.push(this.chatForm.get('textarea')?.value);
      this.chatForm.reset();

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scroll({
        top: this.chatContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    } catch (err) {}
  }

  auth(): void {
    this.dialogService.open(AuthenticationComponent, {
      transitionOptions: '100ms ease-in',
      header: 'Authentication',
      closable: true,
      showHeader: true,
      dismissableMask: true,
    });
  }

  logout(): void {
    this.userService.logout().subscribe(res => {});
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
