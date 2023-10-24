import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Component({
    templateUrl: './login.component.html',
    styles: [`
    em { float:right; color: #E05C65; }
    `]
})
export class LoginComponent {
    userName: string = ''
    password: string = ''
    xover = false

    constructor(private auth: AuthService, private router: Router) {

    }

    login() {
        console.log('on submit')
        this.auth.loginUser(this.userName, this.password)
        this.router.navigate(['event/list'])
    }

    cancel() {
        this.router.navigate(['event/list'])
    }
}
