import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em { float: right; color: #E05C65; }
    .error input { background-color: #E3C3C5; }
    .error ::-webkit-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent {
  profileForm = this.fb.group({
    firstName: [this.auth.currentUser?.firstName, Validators.required],
    lastName: [this.auth.currentUser?.lastName, Validators.required],
  })

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  cancel() {
    this.router.navigate(['event/list'])
  }

  saveProfile() {
    console.log(this.profileForm.value)
    var obj = this.profileForm.value
    this.auth.updateCurrentUser(obj.firstName || '', obj.lastName || '')
    this.router.navigate(['event/list'])
  }
}
