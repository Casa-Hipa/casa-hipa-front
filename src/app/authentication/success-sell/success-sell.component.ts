import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-success-sell',
  templateUrl: './success-sell.component.html',
  styleUrls: ['./success-sell.component.css']
})
export class SuccessSellComponent implements OnInit {

  constructor(private router: Router, private gameService: GamesService) {
    const objetoVenta = JSON.parse(localStorage.getItem("stringVenta"))
    this.gameService.createFactura(objetoVenta).subscribe({
      next: () => {
        localStorage.removeItem("stringVenta")
        localStorage.removeItem("carritoArray")
        setTimeout(() => {
          this.router.navigate(['/admin/blogs/blog-list']);
        }, 5000);
      },
    })
   }

  ngOnInit(): void {
  }

}
