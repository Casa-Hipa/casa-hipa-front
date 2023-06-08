import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ColleccionSearch,
  GameSaveCollecction,
  GameSearch,
  UpdateStore,
} from '../interfaces/games';
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private _http: HttpClient) {}

  getJuegos(gameSearch: GameSearch): Observable<any> {
    return this._http.post<any>('http://localhost:3000/juegos', gameSearch);
  }

  getJuegosBGA(gameSearch: GameSearch): Observable<any> {
    return this._http.get<any>(
      `https://api.boardgameatlas.com/api/search?name=${gameSearch.name}&fuzzy_match=true&client_id=UuIdpEGjlV`
    );
  }
  getJuegosBGAbyID(gameSearchId: string): Observable<any> {
    return this._http.get<any>(
      `https://api.boardgameatlas.com/api/search?ids=${gameSearchId}&client_id=UuIdpEGjlV`
    );
  }

  postJuegoColeccion(gameSave: GameSaveCollecction): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/juegos/coleccion/save',
      gameSave
    );
  }

  postJuegoStore(gameSave: GameSaveCollecction): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/juegos/coleccion/saveStore',
      gameSave
    );
  }

  getJuegosColeccion(coleccion: ColleccionSearch): Observable<any> {
    return this._http.post<any>(
      `http://localhost:3000/juegos/coleccion/`,
      coleccion
    );
  }

  getJuegosColeccionStore(): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/store`);
  }

  updateJuegosColeccionStore(update: UpdateStore): Observable<any> {
    return this._http.put<any>(`http://localhost:3000/store/update`, update);
  }

  deleteJuegoColeccion(coleccion: GameSaveCollecction): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.delete<any>(
      'http://localhost:3000/juegos/coleccion/delete',
      { headers, body: coleccion }
    );
  }

  createFactura(factura: any): Observable<any> {
    return this._http.post<any>(`http://localhost:3000/store/createFactura`, factura);
  }
}
