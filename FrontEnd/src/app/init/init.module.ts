import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
    GoogleLoginProvider,
    SocialAuthServiceConfig,
} from 'angularx-social-login';

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
    ],
})
export class InitModule {}
