import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private initialized = false;
  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    console.log('Iniciando la aplicación...');
    await this.platform.ready();

    if (this.initialized) {
      console.log('La aplicación ya está inicializada');
      return;
    }

  }
}
