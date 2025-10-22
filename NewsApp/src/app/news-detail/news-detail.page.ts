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
        if (this.article) {
          this.article.views = (this.article.views || 0) + 1; 

          if (this.article.images.length > 0) {
            this.selectedImage = this.article.images[0];
          }
        }
      }
      const currentUsername = localStorage.getItem('currentUser') || 'guest';
      const ratingKey = `rating_${currentUsername}_${this.article.id}`;
      const savedRating = localStorage.getItem(ratingKey);
      if (savedRating) {
        this.userRating = +savedRating;
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
      const currentUserName = localStorage.getItem('currentName') || 'You';
      const currentUsername = localStorage.getItem('currentUser') || 'guest';

      const newUser: User = {
      name: currentUserName,
      username: currentUsername,
      password: '' 
    };
      this.article.comments.push({ user: newUser, text: this.newComment });
      this.newComment = '';
    }
  }

  rateNews(rating: number) {
    const currentUsername = localStorage.getItem('currentUser') || 'guest';
    const ratingKey = `rating_${currentUsername}_${this.article.id}`;

    const savedRating = localStorage.getItem(ratingKey);
    if (savedRating) {
      alert('Anda sudah memberi rating untuk berita ini.');
      return;
    }

    localStorage.setItem(ratingKey, rating.toString());

    const totalRating = this.article.rating * this.article.ratingsCount;
    const newTotalRating = totalRating + rating;
    const newRatingsCount = this.article.ratingsCount + 1;
    const newAverageRating = parseFloat((newTotalRating / newRatingsCount).toFixed(1));

    this.article.rating = newAverageRating;
    this.article.ratingsCount = newRatingsCount;
    this.userRating = rating;

    alert(`Terima kasih atas rating ${rating} bintang yang Anda berikan!`);
  }
}
