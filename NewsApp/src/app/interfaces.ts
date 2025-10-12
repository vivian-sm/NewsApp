export interface User{
  username: string;
  name: string;
  password: string;
}


export interface Comment {
  user: User;
  text: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  author: string;
  date: string;
  categories: string[];
  rating: number;
  ratingsCount: number;
  isFavorite: boolean;
  content: string;
  mainImage: string;
  images: string[];
  comments: Comment[];
}

