import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asistente } from 'src/app/interfaces/checkoutEvent';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css'],
})
export class SuccessPaymentComponent implements OnInit {
  asistente = {} as Asistente;
  constructor(private router: Router, private eventService: EventService) {
    this.asistente.email_usuario = localStorage.getItem('email');
    this.asistente.id_evento = localStorage.getItem('id_evento');
    if(this.asistente.id_evento != null){
    eventService.registrarAsistente(this.asistente).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/admin/blogs/blog-list']);
        }, 5000);
      },
    });}
  }

  ngOnInit(): void {}
}
