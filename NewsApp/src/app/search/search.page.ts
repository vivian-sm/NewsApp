import { Component, OnInit } from '@angular/core';
import { NEWS_ARTICLES } from '../news-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone:false
})
export class SearchPage implements OnInit {

  allArticles: any[] = NEWS_ARTICLES;
  filteredArticles: any[] = [];

  constructor() { }

  ngOnInit() {
    this.filteredArticles = [...this.allArticles];
  }
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredArticles = this.allArticles.filter((article) => {
      return article.title.toLowerCase().indexOf(query) > -1;
    });
  }

}
