import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  crearUsuario(){
    // console.log(this.registroForm.value)
    if (this.registroForm.invalid) return;    
    Swal.fire({
      title: 'Espera porfa!',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    const { nombre, correo, password} = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password).then(credenciales => {
      Swal.close();
      this.router.navigate(['/']);
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
