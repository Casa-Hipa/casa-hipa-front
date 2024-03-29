import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';

@Component({
	selector: 'app-forms-validation',
	templateUrl: './forms-validation.component.html',
	styleUrls: ['./forms-validation.component.css']
})
export class FormsValidationComponent implements OnInit {

	public visitorsOptions: EChartsOption = {};
	public visitsOptions: EChartsOption = {};
	public sidebarVisible: boolean = true;
	public dropdownList: Array<any>;
	public selectedItems: Array<any>;
	public dropdownSettings: any;
	public data:any = {};

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef) {
		this.visitorsOptions = this.loadLinEChartsOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLinEChartsOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
		this.dropdownList = [
			{ item_id: 1, item_text: 'Cheese' },
			{ item_id: 2, item_text: 'Tomatoes' },
			{ item_id: 3, item_text: 'Mozzarella' },
			{ item_id: 4, item_text: 'Mushrooms' },
			{ item_id: 5, item_text: 'Pepperoni' },
			{ item_id: 6, item_text: 'Onions' }
		];
		this.selectedItems = [
			{ item_id: 3, item_text: 'Mozzarella' },
			{ item_id: 4, item_text: 'Mushrooms' }
		];
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'item_id',
			textField: 'item_text',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			allowSearchFilter: true
		};
	}

	ngOnInit() {
	}

	onSubmit(isValid: any){
		if (isValid){
			// Logic to add/update data here.
		}
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
