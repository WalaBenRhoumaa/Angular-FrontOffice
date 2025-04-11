import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { IndexComponent } from './components/index/index.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AddfeedbackComponent } from './components/addfeedback/addfeedback.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FeedbackListComponent } from './components/Feedback/feedback-list/feedback-list.component';
import { ReactListComponent } from './components/Reacts/react-list/react-list.component';

@NgModule({
  declarations: [
    AppComponent,
    
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StoreComponent,
    ProductComponent,
    CheckoutComponent,
    IndexComponent,
    SidebarComponent,
    AddfeedbackComponent,
    FeedbackListComponent,
    ReactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
