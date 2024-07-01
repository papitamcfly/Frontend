import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'custom_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/capybara-svgrepo-com.svg")
    );
  }
}
