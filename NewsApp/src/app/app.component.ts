import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { NEWS_CATEGORIES } from './data';

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
  public showTabs: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menu: MenuController
  ) {
    // Panggil initializeApp
    this.initializeApp();

    // Dengar perubahan rute
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.showTabs = false;
        } else {
          this.showTabs = true;
        }
      }
    });
  }

  initializeApp() {
    this.categories = NEWS_CATEGORIES;
    this.currentUsername = localStorage.getItem('currentUser');
    this.currentName = localStorage.getItem('currentName');
    this.profilePictureUrl = 'https://picsum.photos/150';

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/home']);
    }
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/news-list', { category: category }]);
    this.menu.close();
  }

  async logout() {
    this.menu.close();
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
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}