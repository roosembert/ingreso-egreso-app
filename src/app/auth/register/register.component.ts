import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../share/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
      console.log('cargado syb')
    });
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  crearUsuario(){
    // console.log(this.registroForm.value)
    if (this.registroForm.invalid) return;    

    this.store.dispatch( ui.isLoading() );
    // Swal.fire({
    //   title: 'Espera porfa!',
    //   timer: 2000,
    //   timerProgressBar: true,
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    const { nombre, correo, password} = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password).then(credenciales => {
      // Swal.close();
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']);
    }).catch(err => {
      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    });
  }

}
