import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab4Component } from '../tab4/tab4.component';
import { Tab5Component } from '../tab5/tab5.component';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

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
    ExploreContainerComponent
  ]
})
export class TabsPageModule {}