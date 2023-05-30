import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { GamesService } from 'src/app/services/games.service';
import { ActivatedRoute } from '@angular/router';
import { GameSaveCollecction } from 'src/app/interfaces/games';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  public sidebarVisible: boolean = true;
  public productImage: string = 'assets/images/ecommerce/1.png';
  public game = {} as any;
  public gameSave = {} as GameSaveCollecction;
  public isAdmin: boolean;
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private gameService: GamesService,
    private activatedRouter: ActivatedRoute
  ) {
    if (localStorage.getItem('rol') === 'ADMIN') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    this.activatedRouter.snapshot.params['id'];
    this.gameService
      .getJuegosBGAbyID(this.activatedRouter.snapshot.params['id'])
      .subscribe({
        next: (game) => {
          this.game = game.games[0];
          this.gameSave.id_juego = this.activatedRouter.snapshot.params['id'];
          this.gameSave.id_coleccion = localStorage.getItem(
            'id_coleccion_default'
          );
        },
      });
  }

  ngOnInit() {}

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  changeProductImage(image: string) {
    this.productImage = image;
  }
  abrirPagina(pagina: string) {
    window.open(pagina, '_blank');
  }
  abrirReglas(linkReglas) {
    window.open(linkReglas, '_blank');
  }
  agregarColeccion(id: string) {
    this.gameService.postJuegoColeccion(this.gameSave).subscribe({
      next: () => {
        Swal.fire(
          'Perfecto!',
          `Se agregó ${this.game.name} a tu colección`,
          'success'
        );
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo guardar este juego en tu colección!',
        });
      },
    });
  }

  agregarStore(id: string) {
    this.gameService.postJuegoStore(this.gameSave).subscribe({
      next: (resultado) => {
        console.log(resultado);
        Swal.fire(
          'Perfecto!',
          `Se agregó ${this.game.name} a tu Tienda, ahora tienes un stock de: ${resultado.data}`,
          'success'
        );
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo guardar este juego en tu Tienda!',
        });
      },
    });
  }
}
