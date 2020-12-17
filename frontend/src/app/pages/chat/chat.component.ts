import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IMessage } from 'src/app/interfaces/message.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public messageBox: FormGroup = this.fb.group({
    msg: new FormControl("", Validators.required)
  });

  get message() {
    return this.messageBox.controls.msg;
  }

  public messages: IMessage[] = [];
  public activeUsers: IUser[] = [];
  private socketStatus$: Subscription;
  private activeUsers$: Subscription;
  private messages$: Subscription;

  chatBox: HTMLElement;

  constructor(public wsService: WebSocketService,
              private chatService: ChatService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();
    this.chatBox = document.getElementById("chat-messages");
    this.socketStatus$ = this.wsService.getSocketStatus().subscribe(status => {
      if(status) {
        this.listenChatChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.socketStatus$.unsubscribe();
    this.activeUsers$.unsubscribe();
    this.messages$.unsubscribe();
  }

  getUsers() {
    this.chatService.getUsers().subscribe(users => {
      this.activeUsers = users;
    });
  }  

  listenChatChanges() {
    this.activeUsers$ = this.wsService.listen('active-users').subscribe((users: IUser[]) => {
      this.activeUsers = users;
    });
    this.messages$ = this.wsService.listen('new-message').subscribe((msg: IMessage) => {
      this.messages.push(msg);
      if(msg.user_id !== this.wsService.user.id) {
        this.messageSound();
      }
      setTimeout(() => {
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
      }, 50);
    });
  }
  
  sendMessage() {

    if (this.messageBox.invalid || this.message.value.trim() === "") {
      console.log("no pasa");
      return;
    }
    this.chatService.sendMessage(this.message.value);
    this.message.setValue("");
  }

  messageSound() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/new-msg.mp3";
    audio.load();
    audio.play();
  }

}
