import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentlistComponent } from './momentlist.component';
import { RouterModule } from '@angular/router';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material'


@NgModule({
  declarations: [MomentlistComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path:'',
        component:MomentlistComponent
      }
    ])
  ]
})
export class MomentlistModule { }
