import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User, UserLogin } from '../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public sidebarVisible: boolean = true;
  usuarios: any = [];
  usuariosFiltrados: any = [];
  busqueda = ''
  public currentPage = 1
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.getUsuarios().subscribe({
      next: (users) => {
        this.usuarios = users.data;
        this.usuariosFiltrados = this.usuarios

        console.log(this.usuarios)
      },
    });
  }

  ngOnInit(): void {}
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  verUsuario(user: UserLogin) {
    this.userService.getUserByEmail(user).subscribe({
      next: () => {
        this.router.navigate['/admin/pages/page-profile2'];
      },
    });
  }

  filtrarBusqueda(){
    this.usuariosFiltrados = this.usuarios.filter(item =>{
      
        return ( item.nombre?.toLowerCase().includes(this.busqueda.toLowerCase()) || item.apellido?.toLowerCase().includes(this.busqueda.toLowerCase()) || item.email?.toLowerCase().includes(this.busqueda.toLowerCase()) ||item.telefono?.toLowerCase().includes(this.busqueda.toLowerCase()) )
       
    })
  }
}
