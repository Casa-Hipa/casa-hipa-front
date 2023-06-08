import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Asistente, CheckoutEvent } from '../interfaces/checkoutEvent';
import { UserLogin } from '../interfaces/user';
//import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private _http: HttpClient) {}

  public getEvents(): Observable<any> {
    const dateObj = new Date();
    const yearMonth =
      dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    let data: any = [
      {
        title: 'All Day Event',
        start: yearMonth + '-01',
        color: '#17a2b8',
      },
      {
        title: 'Long Event',
        start: yearMonth + '-07',
        end: yearMonth + '-10',
        color: '#dc3545',
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: yearMonth + '-09T16:00:00',
        color: '#343a40',
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: yearMonth + '-16T16:00:00',
      },
      {
        title: 'Conference',
        start: yearMonth + '-11',
        end: yearMonth + '-13',
        color: '#343a40',
      },
      {
        title: 'Meeting',
        start: yearMonth + '-12T10:30:00',
        end: yearMonth + '-12T12:30:00',
      },
      {
        title: 'Lunch',
        start: yearMonth + '-12T12:00:00',
      },
      {
        title: 'Meeting',
        start: yearMonth + '-12T14:30:00',
      },
      {
        title: 'Happy Hour',
        start: yearMonth + '-12T17:30:00',
      },
      {
        title: 'Dinner',
        start: yearMonth + '-12T20:00:00',
      },
      {
        title: 'Birthday Party',
        start: yearMonth + '-13T07:00:00',
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: yearMonth + '-28',
        color: '#007bff',
      },
    ];
    return of(data);
  }

  public getEntradas(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/eventos');
  }

  public registrarEntrada(entrada: any): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/eventos/new_blog',
      entrada
    );
  }

  public checkOut(checkoutEvent: CheckoutEvent): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/utils/checkout',
      checkoutEvent
    );
  }

  public ventaTienda(checkoutEvent: CheckoutEvent): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/utils/ventaTienda',
      checkoutEvent
    );
  }

  public registrarAsistente(asistente: Asistente): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/eventos/registrar_asistente',
      asistente
    );
  }

  public getEventosById(userLogin: UserLogin): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/eventos/byid',
      userLogin
    );
  }
}
