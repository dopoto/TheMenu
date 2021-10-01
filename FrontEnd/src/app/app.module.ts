import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule.forRoot(), SharedModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '123382382905-fhngnav6413lmj57lc91ptjqil509cnv.apps.googleusercontent.com' //TODO
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
