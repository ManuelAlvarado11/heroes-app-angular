import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, RouterStateSnapshot, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate, CanMatch  {
  constructor(private authService: AuthService, private route: Router) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthentication) =>
        console.log('Authentication:', isAuthentication)
      ),
      tap((isAuthentication) => {
        if (isAuthentication) this.route.navigate(['./']);
      }),
      map(isAuthentication => !isAuthentication)
    );
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }



}
