import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'] // Added an S to the end and added []
})
export class HomepageComponent implements OnInit,AfterViewInit{

  public dataSource = {
    datasets: [
        {
            data: [''],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: ['']
};
constructor(private dataService: DataService, @Inject(PLATFORM_ID) private platformId: any) { }


ngOnInit(): void {
  this.dataService.fetchData().subscribe((res: any) => {
    for (var i = 0; i < res.myBudget.length; i++) {
      this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
      this.dataSource.labels[i] = res.myBudget[i].title;
    }
  });
}

ngAfterViewInit(): void {
  setTimeout(() => {
    this.createChart();
  }, 1000);
}

createChart() {
  if (isPlatformBrowser(this.platformId)) {
    const ctx = <HTMLCanvasElement>document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
}
  }
}
