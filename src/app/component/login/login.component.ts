import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/account';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account = new Account('', '', '');
  confirmPass: boolean;

  constructor(
    private accountService: AccountService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const confirm = this.account.confirmPassword;
    const password = this.account.password;
    this.accountService.login(this.account).subscribe(x => {
      if (x.status === 200) {
        const token = x.data.accessToken;
        localStorage.setItem('_apikey', token);
        window.location.reload();
      } else {
        alert('login fail');
      }
    });
    console.log(this.account);
    this.confirmPass = false;
  }

}
