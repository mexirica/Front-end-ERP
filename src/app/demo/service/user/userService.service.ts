import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import {TokenService} from "../token/tokenService.service";
import {User} from "../../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User | null>(null);
    private userName!: string;

    constructor(private tokenService: TokenService) {

        this.tokenService.hasToken() && this.decodeAndNotify()  // Verificando se existe token, e se existir, decodificar
    }

    setToken(token: string, tipo: string) {
        this.tokenService.setToken(token, tipo);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getAccessToken();
        const user = jwtDecode(token) as User;
        this.userName = user.name
        this.userSubject.next(user);
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getID(){
        const decodedToken: any =jwtDecode(this.tokenService.getAccessToken())
        return (decodedToken.user.id)}

    getUserName() {
        const decodedToken: any =jwtDecode(this.tokenService.getAccessToken())
        return (decodedToken.user.name)
    }

    getEmail() {
        const decodedToken: any =jwtDecode(this.tokenService.getAccessToken())
        return (decodedToken.user.email)
    }
}
