import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InbodyFormComponent } from './inbody-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, InbodyFormComponent, RouterModule.forChild([{ path: '', component: InbodyFormComponent }])]
})
export class InbodyModule {}
