import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import {
    GoogleLoginProvider,
    SocialAuthServiceConfig,
} from 'angularx-social-login';

import { AuthGuard } from '../core/guards/auth-guard.service';
import { AppHttpInterceptor } from '../core/interceptors/http.interceptor';
import { ConfigService } from './services/config/config.service';

async function SocialAuthLoaderFactory(configService: ConfigService) {
    await configService.init();
    return new Promise(async (resolve) => {
        resolve({
            autoLogin: false,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(
                        configService.config.serverConfig.googleSignInClientId
                    ),
                },
            ],
        } as SocialAuthServiceConfig);
    });
}

@NgModule({
    providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: (configService: ConfigService) => () =>
                configService.init(),
            deps: [ConfigService],
            multi: true,
        },
        {
            provide: 'SocialAuthServiceConfig',
            useFactory: SocialAuthLoaderFactory,
            deps: [ConfigService],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true,
        },
        { provide: LOCALE_ID, useValue: 'en-US' },
        AuthGuard,        
    ],
})
export class InitModule {}
