class User {
  userId: string;
  name: string;
  email: string;
  imageUrl: string;

  constructor(userId: string, name: string, email: string, imageUrl: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
  }
}
