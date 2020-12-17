import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router,
              private wsService: WebSocketService) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      if(this.wsService.getUser()) {
        return true;
      } else if (this.wsService.isLogging) {
        return true;
      } else {
        return this.router.parseUrl("/login");
      }
  }
  
}
