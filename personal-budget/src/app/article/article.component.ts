import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pb-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  @Input() color = 'red';

  constructor() {}
  ngOnInit(): void{

  }
}
