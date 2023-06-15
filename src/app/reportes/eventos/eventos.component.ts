import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EChartsOption } from 'echarts';
import { FechasBarras } from 'src/app/interfaces/checkoutEvent';
import { GamesService } from 'src/app/services/games.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public sidebarVisible: boolean = true;
  public totalMonto = 0
  public chartOptions: EChartsOption = {};
  public doghnutChart:any = {};
  public tortaData = []
  public asistencias = []
  public asistenciasFiltradas = []
  public detalleAsistencias = []
  public facebookTransitiongoal:number = 50;
  public currentPage = 1
  public fechaAsistencia = {} as FechasBarras
  constructor(public gamesService:GamesService, private modalService: NgbModal,private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef) {
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      this.fechaAsistencia.fecha_ini = `${añoActual}-01-01`
      this.fechaAsistencia.fecha_fin = `${añoActual}-12-31`
      this.gamesService.getChartAsistencia(this.fechaAsistencia).subscribe({
        next:(data)=>{
          this.chartOptions = this.getTopProductChartOptions(data);
        }
      })
      

      gamesService.getTortaEdades().subscribe({
        next:(tortadata:any)=>{

            this.tortaData = tortadata
            this.doghnutChart = this.getDougnutChartOptions();
        }
    })

    this.gamesService.getAsistencias().subscribe({
      next:(data)=>{
        
        this.asistencias = data
        this.asistenciasFiltradas = this.asistencias
      }
    })
     }

  ngOnInit(): void {
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  getDougnutChartOptions(){    
    let totalItems = 0   
    
    this.tortaData.forEach(element => {
        totalItems = totalItems + element.value
        this.totalMonto = this.totalMonto + parseFloat(element.monto)
    });
  let options: any = {
    title: {
        text: `${totalItems}`,
        x: 'center',
        y: 'center',
        textStyle : {
            color : 'rgb(33, 33, 33)',
            fontFamily : 'Arial',
            fontSize : 20,
            fontWeight : 'bolder'
        }
    },
    tooltip : {
        show: true,
        trigger: 'item',
        formatter: '{b}:{c} ({d}%)'
        // formatter: function(params:any) {
        //     return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#212121;"></span>63';
        // }
    },
    series : [
        {
            type: 'pie',
            startAngle: 215,
            clockWise: 1,
            radius : [38, 50],
            itemStyle : {
                normal: {
                    label: {show: false},                    
                    labelLine: {show: false}
                }
            },
            data: this.tortaData

        }
    ]
  }

  return options;
}
filtrarBusqueda(fechaini:string,fechafin:string){}
openModal(content: any, size: any, idfactura:string) {

  
  this.detalleAsistencias= this.asistencias.filter(item => {        
      return item.id_evento == idfactura
    });
    
    console.log(this.detalleAsistencias)


    this.modalService.open(content, { size: size });

}

getTopProductChartOptions(data:any) {
  let options: any = {
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
              
              data: data.meses,
              axisLine: {
                  show: false
              },
              axisLabel: {
                interval:1,
                  textStyle: {
                      color: "#C2C2C2",
                  },
              }
          }
      ],
      yAxis: [
          {
              type: 'value',
              minInterval: 1000,
              splitLine: {
                  lineStyle: {
                      type: 'dotted'
                  }
              },
              axisLine: {
                  show: false
              },
              axisLabel: {
                  formatter: function (value:any) {
                      if (value > 0) {
                          return (value / 1000) + ' K';
                      } else {
                          return 0;
                      }
                  },
                  textStyle: {
                      color: "#C2C2C2",
                  }
              }
          }
      ],
      series: [
          {
              name: 'Ganancia',
              type: 'bar',
              stack: 'Gedgets',
              data: data.valores,
              itemStyle: {
                  color: "#6ebdd1"
              },
              barWidth: "40px"
          },

      ]
  };

  return options;
}

buscarChart(año:string){

  this.fechaAsistencia.fecha_ini = `${año}-01-01`
  this.fechaAsistencia.fecha_fin = `${año}-12-31`
  this.gamesService.getChartAsistencia(this.fechaAsistencia).subscribe({
    next:(data)=>{
      this.chartOptions = this.getTopProductChartOptions(data);
    }
  })
}
}

