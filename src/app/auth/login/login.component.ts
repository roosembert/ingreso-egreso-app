import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private autService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUsuario(){
    if (this.loginForm.invalid) return; 
    
    Swal.fire({
      title: 'Espera porfa!',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    const { correo, password } = this.loginForm.value;
    this.autService.loginUsuario(correo, password).then(credenciales => {
      Swal.close();
      this.router.navigate(['/']);
      console.log(credenciales);
    }).catch(err => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    });
    
  }

}
