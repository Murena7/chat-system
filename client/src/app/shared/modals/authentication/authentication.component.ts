import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@core/api-services/user.service';
import { IUserSignUpBody } from '@core/interfaces/auth.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  activeTab = 0;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  signupForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private userService: UserService, public ref: DynamicDialogRef) {}

  login(): void {
    this.loginForm.get('username')?.markAsDirty();
    this.loginForm.get('password')?.markAsDirty();
    if (this.loginForm.valid) {
      const body: IUserSignUpBody = this.loginForm.value;
      this.userService.login(body).subscribe(res => {
        this.ref.close();
      });
    }
  }

  signup(): void {
    this.signupForm.get('username')?.markAsDirty();
    this.signupForm.get('password')?.markAsDirty();
    if (this.signupForm.valid) {
      const body: IUserSignUpBody = this.signupForm.value;
      this.userService.signUp(body).subscribe(res => {
        this.activeTab = 0;
      });
    }
  }

  ngOnInit(): void {}
}
