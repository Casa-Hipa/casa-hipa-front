import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute } from '@angular/router';
//import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
	selector: 'app-page-gallery',
	templateUrl: './page-gallery.component.html',
	styleUrls: ['./page-gallery.component.css']
})
export class PageGalleryComponent implements OnInit, OnDestroy {

	galleryOptions: NgxGalleryOptions[] = [];
  	galleryImages: NgxGalleryImage[] = [];

	public visitorsOptions: EChartsOption = {};
	public visitsOptions: EChartsOption = {};
    public sidebarVisible: boolean = true;
	
	public _albums = new Array();
    public _albumsTab1 = new Array();
    public _albumsTab2 = new Array();
    public _albumsTab3 = new Array();
    public _albumsTab4 = new Array();
    public fragment: string = "all";
    private ngUnsubscribe = new Subject();

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.fragment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((fragment: any) => {
			if (fragment) {
				this.fragment = fragment;
			}
        });

		this.visitorsOptions = this.loadLinEChartsOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLinEChartsOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
	}
	ngOnInit() {
		this.galleryOptions = [
			{
			  width: '600px',
			  height: '400px',
			  thumbnailsColumns: 4,
			  arrowPrevIcon: 'fa fa-chevron-left',
			  arrowNextIcon: 'fa fa-chevron-right',
			  imageAnimation: NgxGalleryAnimation.Slide
			},
			//max-width 800
			{
			  breakpoint: 800,
			  width: '100%',
			  height: '600px',
			  imagePercent: 80,
			  thumbnailsPercent: 20,
			  thumbnailsMargin: 20,
			  thumbnailMargin: 20
			},
			//max-width 400
			{
			  breakpoint: 400,
			  preview: false
			}
		  ];
	  
		  for (let i = 1; i <= 15; i++) {
			const src = 'assets/images/image-gallery/' + i + '.jpg';
			const thumb = 'assets/images/image-gallery/' + i + '.jpg';
            const album: NgxGalleryImage = {
                small: thumb,
                medium: thumb,
                big: src
			};
			this._albums.push(album);
		}
		for (let i = 1; i <= 4; i++) {
			const src = 'assets/images/image-gallery/' + i + '.jpg';
			const thumb = 'assets/images/image-gallery/' + i + '.jpg';
            const album: NgxGalleryImage = {
                small: thumb,
                medium: thumb,
                big: src
            };
			this._albumsTab1.push(album);
		}
		for (let i = 5; i <= 7; i++) {
			const src = 'assets/images/image-gallery/' + i + '.jpg';
			const thumb = 'assets/images/image-gallery/' + i + '.jpg';
            const album: NgxGalleryImage = {
                small: thumb,
                medium: thumb,
                big: src
            };
			this._albumsTab2.push(album);
		}
		for (let i = 8; i <= 12; i++) {
			const src = 'assets/images/image-gallery/' + i + '.jpg';
			const thumb = 'assets/images/image-gallery/' + i + '.jpg';
            const album: NgxGalleryImage = {
                small: thumb,
                medium: thumb,
                big: src
            };
			this._albumsTab3.push(album);
		}
		for (let i = 13; i <= 15; i++) {
			const src = 'assets/images/image-gallery/' + i + '.jpg';
			const thumb = 'assets/images/image-gallery/' + i + '.jpg';
            const album: NgxGalleryImage = {
                small: thumb,
                medium: thumb,
                big: src
            };
			this._albumsTab4.push(album);
		}
	  }
    
    ngOnDestroy() {
         
        this.ngUnsubscribe.complete();
    }

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
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
}
