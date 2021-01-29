import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMomentComponent } from './add-moment.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AddMomentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddMomentComponent
      }
    ])
  ]
})
export class AddMomentModule { }
