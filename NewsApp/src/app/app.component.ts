import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { NEWS_CATEGORIES } from './data'; // Import kategori

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  public categories: string[] = [];
  public currentUsername: string | null = '';
  public currentName: string | null = '';
  public profilePictureUrl: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.categories = NEWS_CATEGORIES;
    this.currentUsername = localStorage.getItem('currentUser');
    this.currentName = localStorage.getItem('currentName');
    this.profilePictureUrl = 'https://picsum.photos/150';
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/tabs']);
    }
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/news-list', { category: category }]);
    this.menu.close();
  }

  async logout() {
    this.menu.close(); // Tutup menu dulu
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Yakin ingin logout?',
      buttons: [
        {
          text: 'Batal',
          role: 'Cancel',
        },
        {
          text: 'Logout',
          handler: () => {
            localStorage.clear();
            this.router.navigate(['/tabs']);
          },
        },
      ],
    });

    await alert.present();
  }
}