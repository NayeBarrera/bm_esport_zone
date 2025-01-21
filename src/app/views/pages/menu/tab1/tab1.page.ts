import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showPostresZoneInfo() {
    const alert = await this.alertController.create({
      header: 'BM POSTRESZONE',
      message: 'Disfruta de nuestros deliciosos postres artesanales, bebidas y snacks. Un espacio acogedor donde podrás relajarte y disfrutar de las mejores delicias dulces y saladas.',
      buttons: ['Cerrar'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async showEsportsZoneInfo() {
    const alert = await this.alertController.create({
      header: 'BM ESPORTSZONE',
      message: 'Zona gaming equipada con PCs de alta gama, perfecto para gamers. Disfruta de tus juegos favoritos en un ambiente diseñado para la mejor experiencia gaming.',
      buttons: ['Cerrar'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
}