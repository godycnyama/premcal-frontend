import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';


import { TdDataTableService } from '@covalent/core/data-table';
import { TdDialogService } from '@covalent/core/dialogs';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CalculatePremiumComponent } from './components/calculate-premium/calculate-premium.component';
import { ViewHistoryComponent } from './components/view-history/view-history.component';
import { BusyDialogComponent } from './shared/shared.module';
import { ConfirmDialogComponent } from './shared/shared.module';
import { CustomDialogComponent } from './shared/shared.module';
import { CalculationService } from './services/calculation-service/calculation.service';
import { BusyDialogService } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    CalculatePremiumComponent,
    ViewHistoryComponent,
    BusyDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    AppRoutingModule,
    SharedModule
  ],
  providers: [TdDataTableService, TdDialogService, CalculationService, BusyDialogService],
  entryComponents: [BusyDialogComponent, ConfirmDialogComponent, CustomDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
