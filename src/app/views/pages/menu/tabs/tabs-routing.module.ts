import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab4Component } from '../tab4/tab4.component';
import { Tab5Component } from '../tab5/tab5.component';

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
