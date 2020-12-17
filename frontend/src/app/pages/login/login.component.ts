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

  public isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private wsService: WebSocketService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    if(this.form.invalid || this.wsService.socketStatus.value || this.wsService.isLogging) {
      return;
    }

    this.isLoading = true;
    this.wsService.login(this.form.value).subscribe(resp => {
      this.router.navigateByUrl("/");
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    });
  }

}
