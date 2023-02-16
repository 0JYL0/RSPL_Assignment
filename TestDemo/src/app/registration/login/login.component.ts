import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { Customer, DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private auth: AuthGuard, private service: DBService, private router: Router) {
  }

  ngOnInit(): void {
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  change() {
    let UserData: Customer = {
      email: this.form.controls.username.value,
      password: this.form.controls.password.value,
      name: undefined,
      phone: undefined
    }

    if (this.service.authenticate(UserData)) {
      this.service.isLoggedin = true;
      this.router.navigate(['']);
    }
  }

  get username() {
    return this.form.get('username');
  }

  
  get password() {
    return this.form.get('password');
  }
  
  
}
