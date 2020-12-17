import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: new FormControl("", Validators.required)
  });

  constructor(private fb: FormBuilder,
              private wsService: WebSocketService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    if(this.form.invalid || this.wsService.socketStatus.value) {
      return;
    }

    this.wsService.login(this.form.value).subscribe(resp => {
      this.router.navigateByUrl("/");
    });
  }

}
