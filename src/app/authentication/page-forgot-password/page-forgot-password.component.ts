import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.css'],
})
export class PageForgotPasswordComponent implements OnInit {
  user = {} as UserLogin;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.userService.forgotPass(this.user).subscribe({
      next: () => {
        Swal.fire(
          'Good job!',
          'Se envió una nueva contraseña a el mail solicitado!',
          'success'
        );
        this.router.navigate(['/authentication/page-login']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe un usuario con este mail!',
        });
      },
    });
  }
}
