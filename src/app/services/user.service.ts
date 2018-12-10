import {Injectable} from '@angular/core';
import {SecurityService} from './security.service';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';
import {User} from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private user: User;
  constructor(private securityService: SecurityService, private http: HttpClient) {
      this.user = new User(this.securityService.user);
  }
    private apiuri = `${Api.API_URL}user/`;
  getUser(): User {
    return this.user;
  }


  getUserName() {
      const name = this.getUser().username;
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
  uploadAvatar(file: File) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post<any[]>(`${this.apiuri}avatar`, formData);
  }
  findByName(name) {
      return this.http.get<any[]>(`${this.apiuri}${name}`);
  }
    getUserProfileInfo(name) {
        return this.http.get<any[]>(`${this.apiuri}${name}/info`);
    }
}
