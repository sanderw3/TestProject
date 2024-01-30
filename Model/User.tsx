
export class User {
  static ID: number = 0;
  userId: number;
  name: string;
  email: string;
  imageUrl: string;

  constructor(name: string, email: string, imageUrl: string) {

    this.userId = ++User.ID
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
  }
}
