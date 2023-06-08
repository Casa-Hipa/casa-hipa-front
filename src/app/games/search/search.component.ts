import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { NgxPaginationModule } from 'ngx-pagination'
import { GamesService } from 'src/app/services/games.service';
import { GameSearch } from 'src/app/interfaces/games';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public sidebarVisible: boolean = true;
  public gameSearch = {} as GameSearch;
  public games: any[];
  public currentPage = 1
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private gamesService: GamesService,
    private router: Router
  ) {}

  ngOnInit() {}

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  onSubmit(isValid: any) {
    if (isValid) {
      this.gamesService.getJuegosBGA(this.gameSearch).subscribe({
        next: (result) => {
          console.log(result);
          this.games = result.games;
        },
      });
    }
  }

  obtenerDetalle(id: string) {
    this.gamesService.getJuegosBGAbyID(id).subscribe({
      next: (game) => {
        this.router.navigateByUrl(`/admin/games/game-detail/${id}`);
      },
    });
  }
}
