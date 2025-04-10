import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'device';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _currentTheme = signal<Theme>('light');

  public get currentTheme(): Theme {
    return this._currentTheme();
  }

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('device');
    }
  }

  public setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'device') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.applyTheme(prefersDark ? 'dark' : 'light');

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (this._currentTheme() === 'device') {
            this.applyTheme(e.matches ? 'dark' : 'light');
          }
        });
    } else {
      this.applyTheme(theme);
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    const body = document.body;

    if (theme === 'dark') {
      this.renderer.addClass(body, 'theme-dark');
      this.renderer.removeClass(body, 'theme-light');
    } else {
      this.renderer.addClass(body, 'theme-light');
      this.renderer.removeClass(body, 'theme-dark');
    }
  }
}
