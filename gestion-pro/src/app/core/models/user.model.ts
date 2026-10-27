export interface User {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
}

export interface Record {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}
