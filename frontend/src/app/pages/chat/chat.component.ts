import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public messages: any[] = [
    {
      name: "Tomas",
      message: "Hola",
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    },
    {
      name: "Fernando",
      message: "Hola",
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    },
    {
      name: "Tomas",
      message: "Todo bien?",
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    },
    {
      name: "Fernando",
      message: "Todo bien y tu ?",
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    },
    {
      name: "Tomas",
      message: "Bien",
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    },
    {
      name: "Tomas",
      message: "Que hacias?",
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
