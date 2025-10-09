import { Component, OnInit } from '@angular/core';
import { NEWS_ARTICLES } from '../data';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone:false
})
export class FavoritesPage implements OnInit {

  favoriteArticles: any[] = [];
  constructor() { }

  ionViewWillEnter() {
    // Setiap kali masuk halaman ini, perbarui daftar favorit
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteArticles = NEWS_ARTICLES.filter(article => article.isFavorite);
  }

  ngOnInit() {
  }

}
