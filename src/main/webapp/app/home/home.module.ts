import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HackboardSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { CarouselModule } from 'ngx-bootstrap';

@NgModule({
  imports: [CarouselModule, HackboardSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HackboardHomeModule {}
