import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ColleccionSearch } from 'src/app/interfaces/games';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-page-profile-v2',
  templateUrl: './page-profile-v2.component.html',
  styleUrls: ['./page-profile-v2.component.scss'],
})
export class PageProfileV2Component implements OnInit {
  public sidebarVisible: boolean = true;
  public activeTab: string = 'Overview';
  public userLogin = {} as UserLogin;
  public user = {} as any;
  public coleccion = [];
  public eventos = [];

  public coleccionFiltrados = [];
  public eventosFiltrados = [];
  base64String: any;
  public currentPage = 1
  public currentPage2 = 1
  public busqueda = ''
  public busqueda2 = '' 
  public coleccionSearch = {} as ColleccionSearch;
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private gameService: GamesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private eventService: EventService
  ) {
    this.userLogin.email = this.activatedRoute.snapshot.params['email'];
    this.userService.getUserByEmail(this.userLogin).subscribe({
      next: (user) => {
        this.user = user.user;
        this.coleccionSearch.id_coleccion =
          user.user.colecciones[0].id_coleccion;
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
        this.eventService.getEventosById(this.userLogin).subscribe({
          next: (eventos: any) => {
            this.eventos = eventos.data;
            this.eventosFiltrados = this.eventos
            
          },
        });
        // Creamos un objeto ArrayBuffer a partir del array de bytes
        let TYPED_ARRAY = new Uint8Array(user.user.foto_perfil.data);

        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

        this.base64String = btoa(STRING_CHAR);
      },
    });
  }

  ngOnInit() {}

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/png;base64,' + this.base64String
    );
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  toggleTabs(tab: string) {
    if (tab) {
      this.activeTab = tab;
    }
  }
  obtenerDetalle(id: string) {
    this.gameService.getJuegosBGAbyID(id).subscribe({
      next: (game) => {
        this.router.navigateByUrl(`/admin/games/game-detail/${id}`);
      },
    });
  }
  abrirPagina(url: string) {}

  filtrarBusqueda(){
    this.coleccionFiltrados = this.coleccion.filter(item =>{
      
        return ( item.name?.toLowerCase().includes(this.busqueda.toLowerCase())  )
       
    })
  }

  filtrarBusqueda2(){
    this.eventosFiltrados = this.eventos.filter(item =>{
      
        return ( item.titulo?.toLowerCase().includes(this.busqueda2.toLowerCase())  )
       
    })
  }
}
