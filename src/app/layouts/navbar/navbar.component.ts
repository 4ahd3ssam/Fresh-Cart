import { Component, ElementRef, inject, input, OnInit, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);

  modeIcon: string = "/dark-mode.png";
  isLoggedIn = input<boolean>(true);

  constructor(
    private flowbiteService: FlowbiteService
  ) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

}
