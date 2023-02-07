import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { IVariation } from 'src/app/core/models/variation.model';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {
  @Input() data: IVariation[] = [];
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  ngOnChanges() {
    if (this.data.length > 0) {
      this.updateChart();
    }
  }

  updateChart() {
    const labels: number[] = this.data.map((item) => {
      return item.day + 1;
    });
    const data = this.data.map((item) => {
      return item.price;
    });
    this.lineChart.data.labels = labels;
    this.lineChart.data.datasets = [{ data }];
    this.lineChart.update();
  }

  lineChartMethod() {
    const labels: string[] = [];
    const datasets: number[] = [];

    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            fill: false,
            backgroundColor: 'rgba(63,80,181,0.4)',
            borderColor: '#3f50b5',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#3f50b5',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#3f50b5',
            pointHoverBorderColor: '#3f50b5',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: datasets,
            spanGaps: false,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
