import { NgModule } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    SplitterModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    TabViewModule,
    DynamicDialogModule,
    InputTextModule,
  ],
  exports: [
    SplitterModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    TabViewModule,
    DynamicDialogModule,
    InputTextModule,
  ],
})
export class PrimengModule {}
