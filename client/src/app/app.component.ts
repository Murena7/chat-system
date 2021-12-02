import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private socketIo: Socket, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.socketIo.connect();
    this.primengConfig.ripple = true;
  }
}
