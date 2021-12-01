import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutPublicRoutingModule } from './layout-public-routing.module';
import { LayoutPublicComponent } from './layout-public.component';

@NgModule({
  declarations: [LayoutPublicComponent],
  imports: [CommonModule, LayoutPublicRoutingModule],
  exports: [LayoutPublicComponent],
})
export class LayoutPublicModule {}
