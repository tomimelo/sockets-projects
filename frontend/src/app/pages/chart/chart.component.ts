import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Sales' }
  ];
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: ChartType = 'line';
  private chartChanges$: Subscription;

  constructor(private chartService: ChartService,
              private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.getData();
    this.listenChartChanges();
  }

  ngOnDestroy(): void {
    this.chartChanges$.unsubscribe();    
  }

  getData() {
    this.chartService.getData().subscribe((data: ChartDataSets[]) => {
      this.lineChartData = data;
    });
  }

  listenChartChanges() {
    this.chartChanges$ =  this.wsService.listen('chart-change').subscribe((data: ChartDataSets[]) => {
      this.lineChartData[0].data = data[0].data;
    });
  }

  changeValue(month, value) {
    this.chartService.changeValue(month, value).subscribe((data: ChartDataSets[]) => {
      this.lineChartData[0].data = data[0].data;
    });
  }

}
