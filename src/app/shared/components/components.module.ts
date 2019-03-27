import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FuseModule} from '../../../@fuse/fuse.module';
import {BlasonComponent} from './blason/blason.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FuseModule
  ],
  declarations: [
    ConfirmDialogComponent,
    BlasonComponent
  ],
  exports: [
    BlasonComponent,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FuseModule
  ],
  entryComponents: [
    ConfirmDialogComponent
],
})
export class ComponentsModule { }
