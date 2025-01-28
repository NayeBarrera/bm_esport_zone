import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { Tab1Page } from '../informacion/informacion.page';
import { Tab2Page } from '../reservas/reserva.page';
import { Tab3Page } from '../home/home.page';
import { Tab4Component } from '../descuentos/descuentos.component';
import { Tab5Component } from '../perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        component: Tab1Page,
      },
      {
        path: 'tab2',
        component: Tab2Page,
      },

      {
        path: 'tab3',
        component: Tab3Page,
      },
      {
        path: 'tab4',
        component: Tab4Component,
      },
      {
        path: 'tab5',
        component: Tab5Component
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',

      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
