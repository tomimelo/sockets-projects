import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
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
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: ChartType = 'line';
  private chartChanges$: Subscription;

  constructor(private chartService: ChartService,
              private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.getData();
    this.listenChartChanges()
  }

  getData() {
    this.chartService.getData().subscribe(data => {
      this.lineChartData = data;
    });
  }

  listenChartChanges() {
    this.chartChanges$ =  this.wsService.listen('chart-change').subscribe((data: any) => {
      this.lineChartData = data;
    });
  }

  ngOnDestroy(): void {
    this.chartChanges$.unsubscribe();    
  }

}
