import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {
  private readonly authService = inject(AuthService);
  signOut(): void {
    this.authService.signOut();
  }
}
