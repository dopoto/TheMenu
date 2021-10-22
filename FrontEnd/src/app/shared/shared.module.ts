import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule } from 'angularx-social-login';
import { AlertModule } from 'ngx-bootstrap/alert';
import { GridsterModule } from 'angular-gridster2';

import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { DemoModeComponent } from './components/demo-mode/demo-mode.component';

/**
 * Contains code (components, directives, and pipes) that will be used across feature modules in the app.
 * This module should be imported in the feature modules that need it.
 * It should NOT be imported in the main AppModule or CoreModule!
 * This module should consist entirely of declarations, most of them exported.
 * It may re-export other widget modules, such as CommonModule, FormsModule, and modules with the UI controls that you use most widely.
 * It should not have providers, nor should any of its imported or re-exported modules have providers.
 *
 * @tutorial https://angular.io/guide/styleguide#application-structure-and-ngmodules
 * @tutorial https://stackoverflow.com/a/46622924
 *
 */
@NgModule({
    declarations: [
        NavbarComponent,
        NotificationsComponent,
        FooterComponent,
        BreadcrumbComponent,
        PageTitleComponent,
        DemoModeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SocialLoginModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        GridsterModule,
        NgApexchartsModule
    ],
    exports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule,
        SocialLoginModule,
        GridsterModule,
        NgApexchartsModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        NavbarComponent,
        BreadcrumbComponent,
        NotificationsComponent,
        FooterComponent,
        PageTitleComponent,
        DemoModeComponent
    ],
    providers: [],
    bootstrap: [],
    entryComponents: [
    ],
})
export class SharedModule {}
