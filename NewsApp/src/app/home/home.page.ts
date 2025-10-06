import { Component } from '@angular/core';
import { NEWS_ARTICLES, NEWS_CATEGORIES } from '../news-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  breakingNews: any = {};
  recommendations: any[] = [];
  categories: string[] = [];

  constructor() {}
  ngOnInit() {
    // Ambil 1 berita sebagai breaking news
    this.breakingNews = NEWS_ARTICLES[0];
    
    // Ambil sisa berita sebagai rekomendasi
    this.recommendations = NEWS_ARTICLES.slice(1);
    
    this.categories = NEWS_CATEGORIES;
  }
}
