import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css'],
})
export class PageRegisterComponent implements OnInit {
  user = {} as UserLogin;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.userService.onSignUp(this.user).subscribe({
      next: () => {
        Swal.fire('Good job!', 'Usuario registrado!', 'success');
        this.router.navigate(['/authentication/page-login']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ya existe un usuario registrado con este mail!',
        });
      },
    });
  }
}
