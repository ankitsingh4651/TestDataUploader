import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { SweetAlertService } from 'angular-sweetalert-service';
import { ImportComponent } from './Import/Import.component';
import { ImportService } from './service/Import.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as XLSX from 'xlsx';
import {ModalModule} from "ng2-modal";

@NgModule({
  declarations: [
    AppComponent,
    ImportComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
     ReactiveFormsModule,
     HttpModule,
     HttpClientModule,
     Ng2SmartTableModule,
     ModalModule
  ],
  providers: [
       SweetAlertService,ImportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
