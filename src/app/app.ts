import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notifications } from './shared/notifications/notifications';
import { Footer } from './shared/footer/footer';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Notifications],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.checkIfLogin();
  }
}
