import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { PollService } from 'src/app/services/poll.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {

  public form = this.fb.group({
    option: new FormControl("", Validators.required)
  });

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'How old are you ?' }
  ];
  public barChartLabels: Label[] = ['0 - 15', '16 - 25', '26 +'];
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(235, 64, 52, 0.7)'
    }
  ];
  public barChartLegend = true;
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  private pollChanges$: Subscription;

  constructor(public pollService: PollService, 
              private wsService: WebSocketService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.listenPollChanges();
  }

  ngOnDestroy(): void {
    this.pollChanges$.unsubscribe();
  }

  getData() {
    this.pollService.getData().subscribe((data: ChartDataSets[]) => {
      this.barChartData = data;
    });
  }

  listenPollChanges() {
    this.pollChanges$ =  this.wsService.listen('poll-change').subscribe((data: ChartDataSets[]) => {
      this.barChartData[0].data = data[0].data;
    });
  }

  sendPoll() {
    if(this.form.invalid) {
      return;
    }

    this.pollService.changeValue(this.form.value).subscribe((data: ChartDataSets[]) => {
      this.barChartData[0].data = data[0].data;
      this.pollService.saveStorage(this.form.value);
    });
  }

}
