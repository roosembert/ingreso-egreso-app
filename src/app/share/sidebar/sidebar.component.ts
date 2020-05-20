import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string;
  nombreSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    // se usa pipe para extraer un valor del objeto, de lo contrario user.nombre sería null
    this.nombreSubs = this.store.select('user')
                    .pipe(
                      filter( ({ user }) => user != null )
                    )
                    .subscribe(  ({ user })  => this.nombre = user.nombre );
  }

  ngOnDestroy() {
    this.nombreSubs.unsubscribe();
  }

  logout(){
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }

}
