import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsModule } from '@shared/modals/modals.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ModalsModule],
  exports: [ModalsModule],
})
export class SharedModule {}
