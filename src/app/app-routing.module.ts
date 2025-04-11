import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { IndexComponent } from './components/index/index.component';
import { AppComponent } from './app.component';
import { AddfeedbackComponent } from './components/addfeedback/addfeedback.component';
import { FeedbackListComponent } from './components/Feedback/feedback-list/feedback-list.component';
import { ReactListComponent } from './components/Reacts/react-list/react-list.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'store', component: StoreComponent },
  { path: 'product', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'feedback', component: AddfeedbackComponent },
  { path: 'listFeedback', component: FeedbackListComponent },
  { path: 'listReact', component: ReactListComponent },
  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
