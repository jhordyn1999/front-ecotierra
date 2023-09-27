import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataService } from '../data.service';
// import { Observable } from 'rxjs';
// import { MenuService } from '../service/menu/menu.service';
// import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  menuall = [] as any;
  constructor(
    private router: Router,
    private ds: DataService,
    // private menuService: MenuService,
    // private spinner: NgxSpinnerService
  ) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree>/* | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree*/ {
    var url = state.url;
    this.ds.sendData({Caso:1, Url:url});
    return true;
  }
  /** retorna un json armado correctamente para ser dibujado en la vista
    * @param data array del menu tal como viene de la api
   */
 
}
