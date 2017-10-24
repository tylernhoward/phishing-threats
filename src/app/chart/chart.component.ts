import { CounterService } from './../counter.service';
import { Http, Response } from '@angular/http';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  // LineChart
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  // PolarArea
  public polarAreaChartLabels: string[];
  public polarAreaChartData: number[];
  public polarAreaLegend: Boolean = true;

  // Pie
  public pieChartLabels: String[];
  public pieChartData: number[];

  public polarAreaChartType: String = 'polarArea';
  public lineChartType: String = 'line';
  public pieChartType: String = 'pie';

  @Input() polarCount: Array<Object>;
  @Input() lineCount: Array<Object>;
  @Input() pieCount: Array<Object>;
  constructor() {
  }

  ngOnInit() {
    console.log(this.polarCount);
    console.log(this.lineCount);
    console.log(this.pieCount);

    this.initChart();

  }

  ngOnChanges() {
    this.initChart();

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
    this.pieChartLabels = [(this.pieCount[0]['id']), (this.pieCount[1]['id']),
                            (this.pieCount[2]['id']), (this.pieCount[3]['id']),
                            (this.pieCount[4]['id']), (this.pieCount[5]['id'])];
    this.pieChartData = [this.pieCount[0]['count'], this.pieCount[1]['count'], this.pieCount[2]['count'],
                          this.pieCount[3]['count'], this.pieCount[4]['count'], this.pieCount[5]['count']];
  }
  loadPolar() {
    this.polarAreaChartLabels = [this.polarCount[1]['id'], this.polarCount[2]['id'], this.polarCount[3]['id'],
                           this.polarCount[4]['id'], this.polarCount[5]['id'], this.polarCount[6]['id']];
    this.polarAreaChartData = [this.polarCount[1]['count'], this.polarCount[2]['count'], this.polarCount[3]['count'],
                         this.polarCount[4]['count'], this.polarCount[5]['count'], this.polarCount[6]['count']];

  }
  loadLine() {
    this.lineChartData = [
      {
        data: [
          this.lineCount.find(x => x['id'] === '2017 0')['count'],
          this.lineCount.find(x => x['id'] === '2017 1')['count'],
          this.lineCount.find(x => x['id'] === '2017 2')['count'],
          this.lineCount.find(x => x['id'] === '2017 3')['count'],
          this.lineCount.find(x => x['id'] === '2017 4')['count'],
          this.lineCount.find(x => x['id'] === '2017 5')['count'],
          this.lineCount.find(x => x['id'] === '2017 6')['count'],
          this.lineCount.find(x => x['id'] === '2017 7')['count'],
          this.lineCount.find(x => x['id'] === '2017 8')['count'],
          this.lineCount.find(x => x['id'] === '2017 9')['count']
          // this.lineCount.find(x => x['id'] === '2017 10')['count'],
          // this.lineCount.find(x => x['id'] === '2017 11')['count']
        ],
        label: '2017'
      },
      {
        data: [
          this.lineCount.find(x => x['id'] === '2016 0')['count'],
          this.lineCount.find(x => x['id'] === '2016 1')['count'],
          this.lineCount.find(x => x['id'] === '2016 2')['count'],
          this.lineCount.find(x => x['id'] === '2016 3')['count'],
          this.lineCount.find(x => x['id'] === '2016 4')['count'],
          this.lineCount.find(x => x['id'] === '2016 5')['count'],
          this.lineCount.find(x => x['id'] === '2016 6')['count'],
          this.lineCount.find(x => x['id'] === '2016 7')['count'],
          this.lineCount.find(x => x['id'] === '2016 8')['count'],
          this.lineCount.find(x => x['id'] === '2016 9')['count'],
          this.lineCount.find(x => x['id'] === '2016 10')['count'],
          this.lineCount.find(x => x['id'] === '2016 11')['count']
        ],
        label: '2016'
      },
      {
        data: [
          this.lineCount.find(x => x['id'] === '2015 0')['count'],
          this.lineCount.find(x => x['id'] === '2015 1')['count'],
          this.lineCount.find(x => x['id'] === '2015 2')['count'],
          this.lineCount.find(x => x['id'] === '2015 3')['count'],
          this.lineCount.find(x => x['id'] === '2015 4')['count'],
          this.lineCount.find(x => x['id'] === '2015 5')['count'],
          this.lineCount.find(x => x['id'] === '2015 6')['count'],
          this.lineCount.find(x => x['id'] === '2015 7')['count'],
          this.lineCount.find(x => x['id'] === '2015 8')['count'],
          this.lineCount.find(x => x['id'] === '2015 9')['count'],
          this.lineCount.find(x => x['id'] === '2015 10')['count'],
          this.lineCount.find(x => x['id'] === '2015 11')['count']
        ],
        label: '2015'
      },

    ];
    this.lineChartLabels = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

}
