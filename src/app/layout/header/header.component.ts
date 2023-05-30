import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { CheckoutEvent } from 'src/app/interfaces/checkoutEvent';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig],
})
export class HeaderComponent implements OnInit {
  // Properties

  @Input() showNotifMenu: boolean = false;
  @Input() showToggleMenu: boolean = false;
  @Input() darkClass: string = '';
  @Output() toggleSettingDropMenuEvent = new EventEmitter();
  @Output() toggleNotificationDropMenuEvent = new EventEmitter();
  public carrito = [];
  public total: number = 0;
  public checkoutEvent = {} as CheckoutEvent;
  public fechaHoy: Date = new Date();
  constructor(
    private config: NgbDropdownConfig,
    private themeService: ThemeService,
    private router: Router,
    private modalService: NgbModal,
    private eventService: EventService
  ) {
    config.placement = 'bottom-right';
    const arrayStringGuardado = localStorage.getItem('carritoArray');

    if (arrayStringGuardado != null && arrayStringGuardado != '') {
      const arrayGuardado = JSON.parse(arrayStringGuardado);
      this.carrito = arrayGuardado;
      console.log(arrayGuardado);
      this.carrito.forEach((element) => {
        this.total = this.total + parseInt(element.precio);
      });
    }
  }

  ngOnInit() {}

  toggleSettingDropMenu() {
    this.toggleSettingDropMenuEvent.emit();
  }

  toggleNotificationDropMenu() {
    this.toggleNotificationDropMenuEvent.emit();
  }

  toggleSideMenu() {
    this.themeService.showHideMenu();
  }

  logout() {
    localStorage.clear();

    setTimeout(() => {
      this.router.navigate['www.google.com'];
    }, 1000);
  }

  openModal(content: any, size: any) {
    const arrayStringGuardado = localStorage.getItem('carritoArray');

    if (arrayStringGuardado != null && arrayStringGuardado != '') {
      const arrayGuardado = JSON.parse(arrayStringGuardado);
      this.carrito = arrayGuardado;
      this.total = 0;
      this.carrito.forEach((element) => {
        this.total = this.total + parseInt(element.precio);
      });

      this.modalService.open(content, { size: size });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tienes items en tu carrito!',
      });
    }
  }

  pagar() {
    this.checkoutEvent.price = this.total;
    this.checkoutEvent.title = 'Compra Casa Hipa';

    this.eventService.checkOut(this.checkoutEvent).subscribe({
      next: (res) => {
        const url = res.url;
        window.open(url, '_blank');
      },
      error: () => {},
    });
  }
  borrarItem(indice: number) {
    this.carrito.splice(indice, 1);
    const arrayString = JSON.stringify(this.carrito);
    localStorage.setItem('carritoArray', arrayString);

    this.total = 0;
    this.carrito.forEach((element) => {
      this.total = this.total + parseInt(element.precio);
    });
  }
}
