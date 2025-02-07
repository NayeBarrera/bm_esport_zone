import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { Tab1Page } from '../informacion/informacion.page';
import { Tab2Page } from '../reservas/reserva.page';
import { Tab3Page } from '../home/home.page';
import { Tab4Component } from '../descuentos/descuentos.component';
import { Tab5Component } from '../perfil/perfil.component';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CartPage } from '../cart/cart.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [
    //Aqui se colocan los componentes que vayan dentro del menu
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    Tab4Component,
    Tab5Component,
    CartPage,
    ExploreContainerComponent
  ]
})
export class TabsPageModule {}
