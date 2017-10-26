import { CounterService } from './../services/counter.service';
import { Http, Response } from '@angular/http';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  // LineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any>;
  // PolarArea
  public polarAreaChartLabels: string[] = [];
  public polarAreaChartData: number[]= [];
  public polarAreaLegend: Boolean = true;

  public polarAreaChartColors: Array<any> = [{
    backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)',
                      'rgba(247, 70, 74, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(166, 70, 224, 0.6)']}];

  // Pie
  public pieChartLabels: String[] = [];
  public pieChartData: number[] = [];
  public pieChartColors: Array<any> = [{
    backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)',
      'rgba(247, 70, 74, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(166, 70, 224, 0.6)']}];


  public polarAreaChartType: String = 'polarArea';
  public lineChartType: String = 'line';
  public pieChartType: String = 'pie';

  @Input() polarCount: Array<Object>;
  @Input() lineCount: Array<Object>;
  @Input() pieCount: Array<Object>;
  constructor() {
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges() {
  }
  initChart() {
    this.loadPie();
    this.loadPolar();
    this.loadLine();
  }

  public changeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  loadPie() {
    for (let i = 0; i < 6; i++) {
      this.pieChartLabels.push(this.pieCount[i]['id']);
      this.pieChartData.push(this.pieCount[i]['count']);
    }
  }

  loadPolar() {
    for (let i = 1; i < 7; i++) {
      this.polarAreaChartLabels.push(this.polarCount[i]['id']);
      this.polarAreaChartData.push(this.polarCount[i]['count']);
    }
  }
  loadLine() {
    this.lineChartData.push({ data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' });
    const yHigh = this.lineCount[0]['id'].substring(0, 4);
    const yLow = yHigh - 2;
    for (let i = 0; i < this.lineCount.length; i++) {
      if (this.lineCount[i]['id'].substring(0, 4) === String(yLow - 1)) {
        break;
      } else
      if (this.lineCount[i]['id'].substring(0, 4) === yHigh) {
        this.lineChartData[0]['data'].unshift(this.lineCount[i]['count']);
      } else
      if (this.lineCount[i]['id'].substring(0, 4) === String(yHigh - 1)) {
        this.lineChartData[1]['data'].unshift(this.lineCount[i]['count']);
      } else
      if (this.lineCount[i]['id'].substring(0, 4) === String(yLow)) {
        this.lineChartData[2]['data'].unshift(this.lineCount[i]['count']);
      }
    }
    this.lineChartData[0]['label'] = yHigh;
    this.lineChartData[1]['label'] = yHigh - 1;
    this.lineChartData[2]['label'] = yLow;

    this.lineChartLabels = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

}
