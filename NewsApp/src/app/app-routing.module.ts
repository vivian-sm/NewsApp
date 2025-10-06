import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // 1. Arahkan rute kosong ke 'tabs'
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  // 2. Hapus atau beri komentar pada rute /home yang lama
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'news-list',
    loadChildren: () => import('./news-list/news-list.module').then( m => m.NewsListPageModule)
  },
  {
    path: 'news-detail/:id',
    loadChildren: () => import('./news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  },
  // 3. Tambahkan rute untuk halaman tabs
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }