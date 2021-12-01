import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { LayoutsModule } from '@layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InitAppService } from '@core/common-services/init-app.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';

export function appInit(initService: InitAppService): () => Promise<any> {
  return (): Promise<any> => initService.initUser();
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, CoreModule, LayoutsModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [InitAppService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
