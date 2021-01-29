import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMomentComponent } from './add-moment.component';
import { RouterModule } from '@angular/router';


import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule
} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddMomentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddMomentComponent
      }
    ])
  ]
})
export class AddMomentModule { }
