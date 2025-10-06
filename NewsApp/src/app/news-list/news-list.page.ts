import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NEWS_ARTICLES } from '../news-data';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: ['./news-list.page.scss'],
  standalone:false
})
export class NewsListPage implements OnInit {
  articles: any[] = [];
  pageTitle: string = 'All News';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.pageTitle = category;
        this.articles = NEWS_ARTICLES.filter(article => article.categories.includes(category));
      } else {
        this.pageTitle = 'All News';
        this.articles = NEWS_ARTICLES;
      }
    });
  }

}
