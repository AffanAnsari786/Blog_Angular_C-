import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIcon, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MiniProject';
  UserID!:string|null;
  ngOnInit(): void {
    this.UserID=localStorage.getItem("UserID");
  }


  router =[
    {
      pageName:'feed',
      icon:'home',
      url:'/feed',
    },
    {
      pageName:'dashboard',
      icon:'movie',
      url:'/dashboard',
    }
    
  ];

  

}
