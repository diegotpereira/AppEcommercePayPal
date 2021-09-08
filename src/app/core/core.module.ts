import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { MatBadgeModule } from '@angular/material/badge';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '404', component: NotFoundComponent},
      { path: 'error', component: ErrorComponent},
      { path: '*', redirectTo: '/404'}
    ]),
    MatBadgeModule,
    SharedModule
  ],
  exports: [ HeaderComponent]
})
export class CoreModule { }
