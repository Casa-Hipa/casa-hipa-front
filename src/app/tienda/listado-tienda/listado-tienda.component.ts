import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listado-tienda',
  templateUrl: './listado-tienda.component.html',
  styleUrls: ['./listado-tienda.component.scss'],
})
export class ListadoTiendaComponent implements OnInit {
  public sidebarVisible: boolean = true;
  public games: any[];
  public carrito = [];

  @ViewChild('miEnlace', { static: true }) miEnlace: ElementRef;

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private gameService: GamesService
  ) {
    const arrayStringGuardado = localStorage.getItem('carritoArray');

    if (arrayStringGuardado != null && arrayStringGuardado != '') {
      const arrayGuardado = JSON.parse(arrayStringGuardado);
      this.carrito = arrayGuardado;
    }

    this.gameService.getJuegosColeccionStore().subscribe({
      next: (result) => {
        if (result.data.stringIds != '') {
          this.gameService.getJuegosBGAbyID(result.data.stringIds).subscribe({
            next: (games) => {
              this.games = games.games;

              this.games.forEach((element) => {
                const indice = result.data.data.findIndex(
                  (elemento) => elemento.id_juego == element.id
                );
                element.precio = result.data.data[indice].precio;
              });
            },
          });
        }
      },
    });
  }

  ngOnInit(): void {}

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  agregarCarrito(game: any) {
    const arrayStringGuardado = localStorage.getItem('carritoArray');

    if (arrayStringGuardado != null && arrayStringGuardado != '') {
      const arrayGuardado = JSON.parse(arrayStringGuardado);
      this.carrito = arrayGuardado;
    }
    this.carrito.push(game);
    const arrayString = JSON.stringify(this.carrito);
    localStorage.setItem('carritoArray', arrayString);

    Swal.fire(
      'Genial!',
      `Agregaste ${game.name} a tu carrito de compras!`,
      'success'
    );
  }
}
