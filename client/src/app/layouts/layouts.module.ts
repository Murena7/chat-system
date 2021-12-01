import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPublicModule } from './layout-public/layout-public.module';

@NgModule({
  imports: [CommonModule, LayoutPublicModule],
  exports: [LayoutPublicModule],
})
export class LayoutsModule {}
