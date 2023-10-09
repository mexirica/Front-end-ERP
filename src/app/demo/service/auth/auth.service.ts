import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {UserService} from "../user/userService.service";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../../../environments/environment.development";

interface Token {
    access: string;
    refresh: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient,
                private userService: UserService) {}
    API_URL: string = environment.urlBase

    authenticate(email: string, password: string) {
        const url = this.API_URL + "/auth/login"
        return this.http
            .post<Token>(
                url,
                { email, password },
                { observe: 'response' }
            )
            .pipe(
                tap((res) => {
                    const accessToken = res.body?.access;
                    const refreshToken = res.body?.refresh;
                    if (accessToken && refreshToken ) {
                        this.userService.setToken(accessToken, "access-token");
                        this.userService.setToken(refreshToken, "refresh-token");
                    } else {
                        console.log(
                            'Não foi possível obter o token de autenticação'
                        );
                    }
                })
            );
    };
}
