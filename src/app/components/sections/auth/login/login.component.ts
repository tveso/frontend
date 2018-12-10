import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../../entities/user';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../../../services/security.service';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login-v2';
import {TwitterService} from '../../../../services/twitter.service';
import {WINDOW} from '../../../../provider/windowProvider';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public model: User = new User({});
    public loading = false;
    public errors = [];

    constructor(public securityService: SecurityService, protected router: Router,
                protected  socialAuthService: AuthService, protected  twitterService: TwitterService,
                @Inject(WINDOW) protected  window: Window, protected  route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((a) => {
            if (typeof a.oauth_verifier !== 'undefined') {
                localStorage.setItem('oauth_verifier', a.oauth_verifier);
                this.window.close();
            }
            if (typeof a.denied !== 'undefined') {
                this.window.close();
            }
        });
        this.securityService.isLogged().subscribe((a) => {
            if (a !== null) {
                this.router.navigate(['/home']);
                return;
            }
        });
    }

    onSubmit() {
        this.loading = true;
        this.errors = [];
        this.securityService.login(this.model).subscribe((response) => {
            this.securityService.user = response.user;
            if (this.securityService.loggedIn()) {
                this.router.navigate(['/home']);
            }
        }, (error) => {
            this.loading = false;
            if (error.status === 401) {
                this.errors.push('El nombre de usuario o la contraseña son inválidas');
            }
        });
    }

    endLogin(response) {
        this.securityService.user = response.user;
        if (this.securityService.loggedIn()) {
            this.router.navigate(['/home']);
        }
    }

    socialSignIn(socialPlatform: string) {
        const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                const idToken = userData.idToken;
                this.securityService.googleLogin({token: idToken}).subscribe((response) => {
                    this.securityService.user = response.user;
                    if (this.securityService.loggedIn()) {
                        this.router.navigate(['/home']);
                    }
                }, (error) => {
                    this.loading = false;
                    if (error.status === 401) {
                        this.errors.push('El email ya está en uso.');
                    }
                });

            }
        );
    }

    twitterSignIn() {
        this.twitterService.getAuthUrl().subscribe(data => {
            const url = data.url;
            const wind = this.window.open(url, 'MsgWindow', 'menubar=no,\n' +
                '             toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            const o = this;
            const popupTick = setInterval(function () {
                if (wind.closed) {
                    o.twitterService.signIn(localStorage.getItem('oauth_verifier')).subscribe((a) => {
                        o.securityService.user = a.user;
                        if (o.securityService.loggedIn()) {
                            o.router.navigate(['/home']);
                        }
                    });
                    localStorage.setItem('oauth_verifier', null);
                    clearInterval(popupTick);
                }
            }, 500);
        });
    }
}

export function onSingIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
}
