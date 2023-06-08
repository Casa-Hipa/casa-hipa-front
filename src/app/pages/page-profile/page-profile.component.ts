import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User, UserChangePass, UserLogin } from 'src/app/interfaces/user';
import Swal from 'sweetalert2';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { GamesService } from 'src/app/services/games.service';
import {
  ColleccionSearch,
  GameSaveCollecction,
  UpdateStore,
} from 'src/app/interfaces/games';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css'],
})
export class PageProfileComponent implements OnDestroy {
  public sidebarVisible: boolean = true;
  public fragment: string = 'settings';
  private ngUnsubscribe = new Subject();
  usuario = {} as UserLogin;
  perfil = {} as User;
  changePass = {} as UserChangePass;
  base64String: any;
  esString: boolean = true;
  updateStore = {} as UpdateStore;
  stock: number = 0;
  precio: number = 0;
  isAdmin: boolean;
  currentPage = 1
  currentPage2 = 1
  busqueda = ''
  busqueda2 = ''

  public coleccionSearch = {} as ColleccionSearch;
  public juegoAborrar = {} as GameSaveCollecction;
  public coleccion = [];
  public storeGames = [];

  public coleccionFiltrados = [];
  public storeGamesFiltrados = [];
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private gameService: GamesService,
    private modalService: NgbModal
  ) {
    if (localStorage.getItem('rol') === 'ADMIN') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.juegoAborrar.id_coleccion = localStorage.getItem(
      'id_coleccion_default'
    );
    this.coleccionSearch.id_coleccion = localStorage.getItem(
      'id_coleccion_default'
    );
    this.gameService.getJuegosColeccionStore().subscribe({
      next: (result) => {
        if (result.data.stringIds != '') {
          this.gameService.getJuegosBGAbyID(result.data.stringIds).subscribe({
            next: (games) => {
              this.storeGames = games.games;
              this.storeGamesFiltrados = this.storeGames
              this.storeGames.forEach((element) => {
                const indice = result.data.data.findIndex(
                  (elemento) => elemento.id_juego == element.id
                );
                element.precio = result.data.data[indice].precio;
                element.stock = result.data.data[indice].stock;
              });
            },
          });
        }
      },
    });
    this.gameService.getJuegosColeccion(this.coleccionSearch).subscribe({
      next: (result) => {
        if (result.data != '') {
          this.gameService.getJuegosBGAbyID(result.data).subscribe({
            next: (games) => {
              this.coleccion = games.games;
              this.coleccionFiltrados = this.coleccion
            },
          });
        }
      },
    });
    this.usuario.email = localStorage.getItem('email');
    this.userService.getUserByEmail(this.usuario).subscribe({
      next: (user: any) => {
        this.perfil = user.user;

        // Creamos un objeto ArrayBuffer a partir del array de bytes
        let TYPED_ARRAY = new Uint8Array(user.user.foto_perfil.data);

        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

        this.base64String = btoa(STRING_CHAR);
      },
    });

    this.activatedRoute.fragment
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((fragment: any) => {
        if (fragment) {
          this.fragment = fragment;
        }
      });
  }
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/png;base64,' + this.base64String
    );
  }
  ngOnDestroy() {
    this.ngUnsubscribe.complete();
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  changePassword() {
    if (this.changePass.nuevapassword == this.changePass.nuevapassword2) {
      this.changePass.email = this.perfil.email;
      this.userService.changePass(this.changePass).subscribe({
        next: () => {
          Swal.fire('Ok!', 'Actualizaste tu password!', 'success');
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo actualizar tu password!',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Confirmaste mal tu nueva password!',
      });
    }
  }
  update() {
    const date = new Date(`${this.perfil.fecha_nacimiento}T00:00:00.000Z`);

    this.perfil.fecha_nacimiento = date;
    if (typeof this.perfil.foto_perfil != 'string') {
      console.log('no es string');
      this.perfil.foto_perfil = '';
    }
    this.userService.updateUser(this.perfil).subscribe({
      next: () => {
        console.log(this.perfil);
        Swal.fire({
          title: 'Perfil actualizado!',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          denyButtonText: `Cancelar`,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      },
      error: () => {
        console.log(this.perfil);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo actualizar el perfil.',
        });
      },
    });
  }

  desactivarUsuario() {
    Swal.fire({
      title: 'Desea desactivar su usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Desactivar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Desactivado!', '', 'success');
        this.userService.desactUsuario(this.perfil).subscribe({
          next: () => {
            localStorage.clear();
            this.router.navigateByUrl('/authentication/page-login');
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo anduvo mal, no se pudo desactivar tu usuario!',
            });
          },
        });
      } else if (result.isDenied) {
        Swal.fire('No se desactivo su usuario', '', 'info');
      }
    });
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = () => {
        const binaryString: string = reader.result as string;
        this.perfil.foto_perfil = binaryString;
      };
    }
  }

  abrirPagina(pagina: string) {
    window.open(pagina, '_blank');
  }

  obtenerDetalle(id: string) {
    this.gameService.getJuegosBGAbyID(id).subscribe({
      next: (game) => {
        this.router.navigateByUrl(`/admin/games/game-detail/${id}`);
      },
    });
  }

  borrarJuegoColeccion(id_juego: string) {
    this.juegoAborrar.id_juego = id_juego;
    Swal.fire({
      title: 'Desea borrar este juego de su coleccion?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancelar`,
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gameService.deleteJuegoColeccion(this.juegoAborrar).subscribe({
          next: () => {
            location.reload();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo borrar este juego!',
            });
          },
        });
      }
    });
  }

  openModal(
    id_juego: string,
    content: any,
    size: any,
    stock: any,
    precio: any
  ) {
    this.modalService.open(content, { size: size });
    localStorage.setItem('id_juego_update', id_juego);

    this.stock = stock;
    this.precio = precio;
  }

  modificarJuego() {
    this.updateStore.id_juego = localStorage.getItem('id_juego_update');
    localStorage.removeItem('id_juego_update');
    this.updateStore.stock = this.stock;
    this.updateStore.precio = this.precio;
    this.gameService.updateJuegosColeccionStore(this.updateStore).subscribe({
      next: () => {
        Swal.fire('Genial!', 'Se actualizaron los datos!', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },

      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron actualizar los datos!',
        });
      },
    });
  }


  filtrarBusqueda(){
    this.coleccionFiltrados = this.coleccion.filter(item =>{
      
        return ( item.name?.toLowerCase().includes(this.busqueda.toLowerCase())  )
       
    })
  }

  filtrarBusqueda2(){
    this.storeGamesFiltrados = this.storeGames.filter(item =>{
      
        return ( item.name?.toLowerCase().includes(this.busqueda2.toLowerCase())  )
       
    })
  }
}
