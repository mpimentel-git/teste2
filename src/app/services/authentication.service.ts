import { environment } from 'src/environments/environment'
import { User } from '../models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const CURRENT_USER = 'current_user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    // private currentUserSubject: Subject<User> = new ReplaySubject<User>(1);

    public currentUser: Observable<User>;

    private API_URL: string = environment.baseUrl

    constructor(private http: HttpClient) {

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem(CURRENT_USER)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        if (this.currentUserSubject) return this.currentUserSubject.value;
        throw new Error("User not found")
    }

    login(username: string, password: string) {

        const body = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('grant_type', 'password');

        return this.http.post<any>(`${this.API_URL}/oauth2/v1/token`, body)
            .pipe(map(response => {

                let decoded = helper.decodeToken(response.access_token);
                //console.log(decoded);

                localStorage.setItem(CURRENT_USER, JSON.stringify(decoded));
                localStorage.setItem(TOKEN_KEY, response.access_token.toString());

                this.currentUserSubject.next(decoded);
                //Expiration time
                this.currentUserValue!.exp = decoded.exp;

                return response;

            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CURRENT_USER);
        // this.currentUserSubject.next(null);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('CURRENT_USER')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }
}
