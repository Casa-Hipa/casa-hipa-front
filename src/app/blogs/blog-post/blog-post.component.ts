import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Entrada } from 'src/app/interfaces/entrada';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  @ViewChild('toolsRTE') rteObj: RichTextEditorComponent;
  @ViewChild('alltoolRTE') rteObj2: RichTextEditorComponent;
  public sidebarVisible: boolean = true;

  public config: object = {
    type: 'Scrolleable',
    enableFloating: true,
    items: [
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      '|',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      '|',
      'LowerCase',
      'UpperCase',
      '|',
      'Undo',
      'Redo',
      '|',
      'Formats',
      'Alignments',
      '|',
      'OrderedList',
      'UnorderedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'CreateLink',
      'CreateTable',
      'Image',
      '|',
      'ClearFormat',
      'Print',
      'SourceCode',
      '|',
      'FullScreen',
    ],
  };

  public htmlContent: string = '';
  public entrada = {} as Entrada;
  localStorage = window.localStorage;
  email = localStorage.getItem('email');

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private eventService: EventService,
    private router: Router
  ) {
    this.entrada.email_usuario = this.email;
  }

  ngOnInit() {
    if (this.rteObj) {
      this.rteObj.refreshUI();
    } else {
      // Espera 5 segundos antes de ejecutar la función
      setTimeout(() => {
        // Instrucciones que se ejecutarán después de la espera
        this.rteObj.refreshUI();
      }, 500);
    }
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  registrar() {
    const date = new Date(`${this.entrada.fecha_inicio}T00:00:00.000Z`);

    this.entrada.fecha_inicio = date;
    this.entrada.parrafo = this.rteObj.getHtml();
    this.eventService.registrarEntrada(this.entrada).subscribe({
      next: () => {
        Swal.fire(
          'Perfecto!',
          'Creaste una nueva entrada para tu blog!',
          'success'
        );

        this.router.navigate(['/admin/blogs/blog-list']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo crear una nueva entrada para tu blog!',
        });
      },
    });
  }
}
