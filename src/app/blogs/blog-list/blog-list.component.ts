import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { EventService } from 'src/app/services/event.service';
import { DatePipe } from '@angular/common';
import { CheckoutEvent } from 'src/app/interfaces/checkoutEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  public sidebarVisible: boolean = true;

  public entradas = [];
  public checkoutEvent = {} as CheckoutEvent;
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private eventService: EventService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.eventService.getEntradas().subscribe({
      next: (entradas: any) => {
        this.entradas = entradas.data;
      },
    });
  }

  ngOnInit() {}

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  checkout(entrada: any) {
    this.checkoutEvent.price = entrada.precio;
    this.checkoutEvent.title = entrada.titulo;
    localStorage.setItem('id_evento', entrada.id_evento);
    this.eventService.checkOut(this.checkoutEvent).subscribe({
      next: (res) => {
        const url = res.url;

        window.open(url, '_blank');
        alert('success');
      },
      error: () => {
        alert('error');
      },
    });
  }
}
