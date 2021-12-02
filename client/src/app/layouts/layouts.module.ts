import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPublicModule } from './layout-public/layout-public.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, LayoutPublicModule, SharedModule],
  exports: [LayoutPublicModule],
})
export class LayoutsModule {}
