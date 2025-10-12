import { Injectable } from '@angular/core';
import { USERS } from './data';

export interface User {
  username: string;
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private currentUser: User | null = null;

  constructor() {}
  public login(username: string, password: string): User {
    for (let user of USERS) {
      if (user.username === username && user.password === password) {
        this.currentUser = user;
        return user;
      }
    }
    return { username: '', name: '', password: '' };
  }

  public signup(username: string, name: string, password: string): string {
    const existingUser = USERS.find(u => u.username === username);
    if (existingUser) {
      return 'Username already taken';
    }
    const newUser: User = { username, name, password };
    USERS.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return 'Registration successful';
  }

  public logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  public getCurrentUser(): User | null {
    if (!this.currentUser) {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        this.currentUser = JSON.parse(saved);
      }
    }
    return this.currentUser;
  }
  public ensureLoggedIn(router: any) {
    if (!this.getCurrentUser()) {
      router.navigate(['/login']);
    }
  }
}
