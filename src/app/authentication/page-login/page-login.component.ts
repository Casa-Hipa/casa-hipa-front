import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin, User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css'],
})
export class PageLoginComponent implements OnInit {
  logForm = {} as UserLogin;
  email: string;
  pass: string;

  constructor(private router: Router, private userLoginService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.userLoginService.onLogin(this.logForm).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        localStorage.setItem('rol', res.role);
        localStorage.setItem('carritoArray', '');
        localStorage.setItem('id_coleccion_default', res.id_coleccion_default);
        this.router.navigate(['/admin/blogs/blog-list']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password o email erroneos!',
        });
      },
    });
  }
}
