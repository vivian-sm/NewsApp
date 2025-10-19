import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NEWS_ARTICLES } from '../data';
import { User } from '../interfaces';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
  standalone: false,
})

export class NewsDetailPage implements OnInit {
  article: any;
  newComment: string = '';
  selectedImage: string | undefined;
  public userRating: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      if (articleId) {
        this.article = NEWS_ARTICLES.find(
          (article) => article.id === +articleId
        );
        if (this.article && this.article.images.length > 0) {
          this.selectedImage = this.article.images[0];
        }
      }
      const currentUsername = localStorage.getItem('currentUser') || 'guest';
      const ratingKey = `rating_${currentUsername}_${this.article.id}`;
      const savedRating = localStorage.getItem(ratingKey);
      if (savedRating) {
        this.userRating = +savedRating; // + untuk konversi string ke number
      }
    });
  }
  selectImage(image: string) {
    this.selectedImage = image;
  }

  toggleFavorite() {
    if (this.article) {
      this.article.isFavorite = !this.article.isFavorite;
    }
  }

  addComment() {
    if (this.newComment.trim().length > 0) {
      const currentUsername = localStorage.getItem('currentUser') || 'guest';

      const newUser: User = {
      name: 'You',
      username: currentUsername,
      password: '' 
    };
      this.article.comments.push({ user: newUser, text: this.newComment });
      this.newComment = '';
    }
  }

rateNews(rating: number) {
  this.userRating = rating;

  const currentUsername = localStorage.getItem('currentUser') || 'guest';
  const ratingKey = `rating_${currentUsername}_${this.article.id}`;

  // 3. Simpan ke localStorage
  localStorage.setItem(ratingKey, rating.toString());

  alert(`Terima kasih atas rating ${rating} bintang yang Anda berikan!`);
}
}
