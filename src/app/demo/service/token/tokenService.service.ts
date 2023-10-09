import { Injectable } from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Injectable({ providedIn: "root"})
export class TokenService {

    constructor(private cookieService: CookieService) {
    }
    hasToken() {
        return !!this.getAccessToken();
    }

    setToken(token: string, tipo: string) {
        this.cookieService.set(tipo, token)
    }

    getAccessToken() {
        return this.cookieService.get("accessToken") as string;
    }

    getRefreshToken() {
        return this.cookieService.get("refreshToken") as string;
    }

    removeToken() {
        window.localStorage.removeItem("accessToken")
        window.localStorage.removeItem("refreshToken")
    }
}
