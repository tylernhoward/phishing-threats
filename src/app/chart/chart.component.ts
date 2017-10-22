import { Http, Response } from '@angular/http';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() cdata;

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

  polarCount: Array<Object>;
  lineCount: Array<Object>;
  pieCount: Array<Object>;
  isoCountries: any;
  constructor(private http: Http) {
    this.http.get('../assets/isoCountries.json').map((res: Response) => res.json()).subscribe(data => {
      this.isoCountries = data;
      this.initChart();
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }
  initChart() {
    this.polarCount = this.countTarget();
    this.pieCount = this.countCountries();
    this.lineCount = this.countYears();
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
    this.pieChartLabels = [this.getCountryName(this.pieCount[0]['id']), this.getCountryName(this.pieCount[1]['id']),
                            this.getCountryName(this.pieCount[2]['id']),this.getCountryName(this.pieCount[3]['id']),
                            this.getCountryName(this.pieCount[4]['id']), this.getCountryName(this.pieCount[5]['id'])];
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




  // Counting Functions for data feed.
  countTarget() {
    const obj: Object = {};
    for (let i = 0; i < this.cdata.length; i++) {
      if (!obj.hasOwnProperty(this.cdata[i].target)) {
        obj[this.cdata[i].target] = 1;
      } else {
        obj[this.cdata[i].target] = obj[this.cdata[i].target] + 1;
      }
    }
    const sortedArray = [];
    for (const data in obj) {
      if (data !== null) {
      sortedArray.push({ 'id': data, 'count': obj[data] });
      }
    }
    sortedArray.sort(function (a, b) {
      return b['count'] - a['count'];
    });
    return sortedArray;
  }
  countCountries() {
    const obj: Object = {};
    for (let i = 0; i < this.cdata.length; i++) {
      if (!obj.hasOwnProperty(this.cdata[i].details[0].country)) {
        obj[this.cdata[i].details[0].country] = 1;
      } else {
        obj[this.cdata[i].details[0].country] = obj[this.cdata[i].details[0].country] + 1;
      }
    }
    const sortedArray = [];
    for (const data in obj) {
      if (data !== null) {
        sortedArray.push({'id': data, 'count': obj[data]});
      }
    }
    sortedArray.sort(function (a, b) {
      return b['count'] - a['count'];
    });
    return sortedArray;
  }
  countYears() {
    const obj: Object = {};
    for (let i = 0; i < this.cdata.length; i++) {
      const date = new Date(this.cdata[i].verification_time);
      const prop = (date.getFullYear() + ' ' + date.getMonth());
      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = 1;
      } else {
        obj[prop] = obj[prop] + 1;
      }
    }
    const sortedArray = Object.keys(obj).map(function (key) {
      return { 'id': key, 'count': obj[key]};
    });
    sortedArray.sort().reverse();
    return sortedArray;
  }
  getCountryName(countryCode) {
    if (this.isoCountries.hasOwnProperty(countryCode)) {
      return this.isoCountries[countryCode];
    } else {
      return countryCode;
    }
  }

}
