import { Component } from '@angular/core';
import { NEWS_ARTICLES, NEWS_CATEGORIES } from '../data';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.breakingNews = NEWS_ARTICLES[0];
    this.recommendations = NEWS_ARTICLES.slice(1);
    this.categories = NEWS_CATEGORIES;
  }
}
