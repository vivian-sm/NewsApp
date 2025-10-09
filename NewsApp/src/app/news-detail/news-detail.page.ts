import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NEWS_ARTICLES } from '../data';

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
      this.article.comments.push({ user: 'You', text: this.newComment });
      this.newComment = '';
    }
  }

  rateNews(rating: number) {
    // Logika untuk menambahkan rating baru dan menghitung ulang rata-rata
    // Untuk saat ini, kita hanya tampilkan pesan
    console.log(`Anda memberikan rating: ${rating}`);
    alert(`Terima kasih atas rating ${rating} bintang yang Anda berikan!`);
  }
}
