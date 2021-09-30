import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [],
    entryComponents: [
    ],
})
export class SharedModule {}
