import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'ru', 'kk'].includes(savedLanguage)) {
      this.translateService.use(savedLanguage);
    } else {
      this.translateService.use('en');
    }

    this.translateService.addLangs(['en', 'ru', 'kk']);
  }
}
