import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HackboardSharedModule } from '../shared';
import { NgxSelectModule } from 'ngx-select-ex';

import {
  Register,
  ActivateService,
  PasswordService,
  PasswordResetInitService,
  PasswordResetFinishService,
  SessionsService,
  SessionsComponent,
  PasswordStrengthBarComponent,
  RegisterComponent,
  ActivateComponent,
  PasswordComponent,
  PasswordResetInitComponent,
  PasswordResetFinishComponent,
  SettingsComponent,
  accountState
} from './';

@NgModule({
  imports: [HackboardSharedModule, NgxSelectModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SessionsComponent,
    SettingsComponent
  ],
  providers: [
    SessionsService,
    Register,
    ActivateService,
    PasswordService,
    PasswordResetInitService,
    PasswordResetFinishService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HackboardAccountModule {}
