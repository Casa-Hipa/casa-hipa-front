import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EChartsOption } from 'echarts';
import { FechasBarras } from 'src/app/interfaces/checkoutEvent';
import { GamesService } from 'src/app/services/games.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
    @ViewChild('fechaInicioInput') fechaInicioInput: ElementRef;
  @ViewChild('fechaFinInput') fechaFinInput: ElementRef;
  public earningOptions: EChartsOption = {};
  public sidebarVisible: boolean = true;
  public earningsBarChart:EChartsOption = {};
  public doghnutChart:any = {};
  public facturas = []
  public facturasFiltradas = []
  public detallesFactura = {} as any
  public total : number
  public mechanics = []
  public sinStock = []
  public tortaData = []
  public totalMonto = 0
  public dataEchart = []
  public stackedBarChart: EChartsOption = {};
  public fechasBarra = {} as FechasBarras
  public stringIds = ''
  public currentPage = 1
  public currentPage2 = 1
  constructor(public gamesService:GamesService, private modalService: NgbModal,private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,) { 
    this.fechasBarra.fecha_ini = '2023-01-01'
    this.fechasBarra.fecha_fin = '2023-12-31'
    gamesService.getBarrasVentas(this.fechasBarra).subscribe({
        next:(data)=>{
            
            this.stackedBarChart = this.getTopProductChartOptions(data.meses, data.valores);
        }
    })
    
    gamesService.getSinStock().subscribe({
        next:(data)=>{
            
            this.stringIds = data.data.stringIds
            
            gamesService.getJuegosBGAbyID(this.stringIds).subscribe({
                next:(juegos)=>{
                    
                    data.data.data.forEach(element => {
                        const index = juegos.games.findIndex((x)=> x.id == element.id_juego)
                        element.nombre = juegos.games[index].name
                    });

                    this.sinStock = data.data.data
                }
            })
        }
    })
    gamesService.getMechanics().subscribe({
        next:(mechanics:any)=>{
            this.mechanics = mechanics.mechanics

            gamesService.getTorta().subscribe({
                next:(tortadata:any)=>{
                    tortadata.forEach(elemento => {
                        
                        const index = this.mechanics.findIndex((x) => x.id === elemento.name)
                        
                        if(index != -1){
                        elemento.name = this.mechanics[index]?.name}
                    });
                    this.tortaData = tortadata
                    this.doghnutChart = this.getDougnutChartOptions();
                }
            })
        }
    })
    gamesService.getFacturas().subscribe({
        next:(facturas:any)=>{
            
            this.facturas = facturas
            this.facturasFiltradas = this.facturas
        }
    })
  }

  ngOnInit(): void {
    this.earningOptions = this.loadLineAreaChartOptions([1, 4, 1, 3, 7, 1,2,3,4], "#f79647", "#fac091");

  }
  loadLineAreaChartOptions(data:any, color:any, areaColor:any) {
    let chartOption: EChartsOption;
    let xAxisData: Array<any> = new Array<any>();

    data.forEach((element:any) => {
        xAxisData.push("");
    });

    return chartOption = {
        xAxis: {
            type: 'category',
            show: false,
            data: xAxisData,
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            show: false,
            min: 1
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params:any) {
                return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: false
        },
        series: [{
            data: data,
            type: 'line',
            showSymbol: false,
            symbolSize: 1,
            lineStyle: {
                color: color,
                width: 1
            },
            areaStyle: {
                color: areaColor
            }
        }]
    };
}
  loadLinEChartsOptions(data:any, color:any) {
    let chartOption: EChartsOption;
    let xAxisData: Array<any> = new Array<any>();

    data.forEach((element:any) => {
        xAxisData.push("");
    });

    return chartOption = {
        xAxis: {
            type: 'category',
            show: false,
            data: xAxisData,
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            show: false
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params:any) {
                return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: false
        },
        series: [{
            data: data,
            type: 'line',
            showSymbol: false,
            symbolSize: 1,
            lineStyle: {
                color: color,
                width: 1
            }
        }]
    };
}

getEarningsChartOptions() {
  let options: any = {
      tooltip : {
          trigger: 'item',
          formatter:function(params:any){
              let param:any = params;
            return param.marker+" "+param.value;
          }
      },
      grid: {
          borderWidth: 0,
          y: 80,
          y2: 60
      },
      xAxis : [
          {
              type : 'category',
              show: false,
          }
      ],
      yAxis : [
          {
              type : 'value',
              show: false
          }
      ],
      series : [
          {
              
              type: 'bar',
              data: [2, 5, 4, 8, 3, 9, 1, 5],
              itemStyle: {
                  color: '#7460ee'
              },
              barWidth: '10px'
          }
      ]
  };
  return options;
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
            // [
            //       {
            //           value: 100,
            //           name: 'C',
            //         //   itemStyle :  {
            //         //     tooltip: {show: true},
            //         //     label: {show: true},
            //         //       color: '#212121',
            //         //       emphasis : {
            //         //           color: '#212121'
            //         //       }
            //         //   }
            //       },
            //       {
            //           value: 100,
            //           name: 'A',
            //         //   itemStyle :  {
            //         //       normal: {
            //         //           color: '#EEEEEE',
            //         //           label: {show: true},
            //         //           labelLine: {show: false},
            //         //           tooltip: {show: true}
            //         //       },
            //         //       emphasis : {
            //         //           color: '#EEEEEE'
            //         //       }
            //         //   }
            //       },
            //       {
            //           value: 100,
            //           name: 'B',
            //         //   itemStyle :  {
            //         //       normal : {
            //         //           color: 'rgba(0,0,0,0)',
            //         //           label: {show: true},
            //         //           labelLine: {show: false},
            //         //           tooltip: {show: true}
            //         //       }
            //         //   }
            //       }
            //   ]
        }
    ]
  }

  return options;
}

getTopProductChartOptions(meses, valores) {
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
                data: meses,//['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
                axisLine: {
                    show: false
                },
                axisLabel: {
                    interval: 1,
                    textStyle: {
                        color: "#C2C2C2",
                    },
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                minInterval: 2500,
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
        
        series:
         [
            {
                name: 'Ventas',
                type: 'bar',
                stack: 'Ventas',
                data: valores,//[2350, 3205, 4520, 2351, 5632],
                itemStyle: {
                    color: "#6ebdd1"
                },
                barWidth: "40px"
            },
            // {
            //     name: 'Laptop',
            //     type: 'bar',
            //     stack: 'Gedgets',
            //     data: [2341, 2583, 1592, 2674, 2323],
            //     itemStyle: {
            //         color: "#f9ab6c"
            //     },
            //     barWidth: "40px"
            // },
            // {
            //     name: 'Computer',
            //     type: 'bar',
            //     stack: 'Gedgets',
            //     data: [1212, 5214, 2325, 4235, 2519],
            //     itemStyle: {
            //         color: "#afc979"
            //     },
            //     barWidth: "40px"
            // }
        ]
    };

    return options;
}

buscarBarras(fechaIni:string, fechaFin:string){
this.fechasBarra.fecha_ini = fechaIni
this.fechasBarra.fecha_fin = fechaFin

const fechaInicioDate: Date = new Date(fechaIni);
const fechaFinDate: Date = new Date(fechaFin);

const unAnio = 365 * 24 * 60 * 60 * 1000; // Cantidad de milisegundos en un año

if (fechaFinDate.getTime() - fechaInicioDate.getTime() > unAnio) {
  // La diferencia es mayor a un año
  Swal.fire("Error!", "Debe ingresar un periodo no mayor a un año", "error");
} else {
  // La diferencia es menor o igual a un año
  this.gamesService.getBarrasVentas(this.fechasBarra).subscribe({
    next:(data)=>{
        this.stackedBarChart = this.getTopProductChartOptions(data.meses, data.valores);
    }
})
}


}

obtenerDetalle(idfactura:string){
    this.detallesFactura = this.facturasFiltradas.filter(item => {        
        return item.idfactura == idfactura
      });
      
}
filtrarBusqueda(fechaseleccionada:string, fechaseleccionadafin:string){
    const fechaFiltrado = new Date(fechaseleccionada);
    const fechaFiltradoFin = new Date(fechaseleccionadafin);
    console.log(fechaFiltradoFin)
    this.facturasFiltradas = this.facturas.filter(item => {
        const fechaItem = new Date(item.fecha);
        

        return fechaItem >= fechaFiltrado && fechaItem <= fechaFiltradoFin;
      });

      console.log(this.facturasFiltradas)
}

openModal(content: any, size: any, idfactura:string, tot:number) {

    this.total = tot
    this.detallesFactura = this.facturasFiltradas.filter(item => {        
        return item.id == idfactura
      });
      
      
      //this.total = 0;
    //   this.carrito.forEach((element) => {
    //     this.total = this.total + parseInt(element.precio);
    //   });

      this.modalService.open(content, { size: size });

  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
}


