import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatePremiumComponent } from './components/calculate-premium/calculate-premium.component';
import { ViewHistoryComponent } from './components/view-history/view-history.component';
const routes: Routes = [
  {
    path: '',
    component: CalculatePremiumComponent
  },
  {
    path: 'view-history',
    component: ViewHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
