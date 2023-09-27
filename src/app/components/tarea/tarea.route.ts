import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from "src/app/guards/permission.guard";
import { TareaComponent } from './tarea.component';


export const routes: Routes = [
    {
        path: '',
        // canActivate: [PermissionGuard] ,
        component: TareaComponent,
        data: {
            pageTitle: 'Home'
        },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TareaRoutingModule {}
