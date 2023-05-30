import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-payment',
  templateUrl: './error-payment.component.html',
  styleUrls: ['./error-payment.component.css'],
})
export class ErrorPaymentComponent implements OnInit {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/admin/blogs/blog-list']);
    }, 5000);
  }

  ngOnInit(): void {}
}
