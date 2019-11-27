import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/account';
import { AccountService } from '../../service/account.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account = new Account(0, "", "", "");
  confirmPass: boolean;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const confirm = this.account.confirmPassword;
    const password = this.account.password;
    if (confirm === password) {
      this.accountService.register(this.account).subscribe(x => {
        if (x.status === 201) {
          alert('create success');
          // let token = x.data.accessToken
          // localStorage.setItem("token", token)
        } else {
          alert('create fail');
        }
      });
      console.log(this.account);
      this.confirmPass = false;
    } else {
      this.confirmPass = true;
    }

  }
}
