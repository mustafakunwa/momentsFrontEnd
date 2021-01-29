import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentlistComponent } from './momentlist.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MomentlistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:MomentlistComponent
      }
    ])
  ]
})
export class MomentlistModule { }
