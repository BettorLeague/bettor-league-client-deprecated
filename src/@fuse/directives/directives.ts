import { NgModule } from '@angular/core';
import {FuseIfOnDomDirective} from "./fuse-if-on-dom/fuse-if-on-dom.directive";
import {FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective} from './fuse-mat-sidenav/fuse-mat-sidenav.directive';

@NgModule({
    declarations: [FuseIfOnDomDirective,FuseMatSidenavHelperDirective,FuseMatSidenavTogglerDirective],
    imports     : [],
    exports     : [FuseIfOnDomDirective, FuseMatSidenavHelperDirective,FuseMatSidenavTogglerDirective]
})
export class FuseDirectivesModule
{
}
