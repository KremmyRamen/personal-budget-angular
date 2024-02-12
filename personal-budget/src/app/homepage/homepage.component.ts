import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'] // Added an S to the end and added []
})
export class HomepageComponent {

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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.data.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        this.dataSource.labels[i] = res.data.myBudget[i].title;
        this.createChart();
    }
    });
  }
  createChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}
}
