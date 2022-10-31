export default class User {
  id: string | undefined;
  username: string;
  password: string;
  name: string;
  phone: string | undefined;
  role: string;

  constructor(username: string, password: string, name: string, role: string, phone?: string , id?: string){
      this.id = id;
      this.username = username;
      this.password = password;
      this.name = name;
      this.phone = phone,
      this.role = role
  }
}

