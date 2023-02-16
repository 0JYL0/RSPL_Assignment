import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { DBService } from './shared/db.service';
import { CustomPipePipe } from './shared/custom-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CustomPipePipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DBService,CustomPipePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
