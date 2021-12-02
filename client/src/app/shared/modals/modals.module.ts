import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from '@shared/modals/authentication/authentication.component';
import { PrimengModule } from '@shared/primeng/primeng.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, PrimengModule, ReactiveFormsModule],
  exports: [AuthenticationComponent],
})
export class ModalsModule {}
