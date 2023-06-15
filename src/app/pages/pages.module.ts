import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBlankComponent } from './page-blank/page-blank.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageProfileV2Component } from './page-profile-v2/page-profile-v2.component';
import { PageFaqComponent } from './page-faq/page-faq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FormsModule } from '@angular/forms';
import { SuccessPaymentComponent } from '../authentication/success-payment/success-payment.component';
import { ErrorPaymentComponent } from '../authentication/error-payment/error-payment.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    PageBlankComponent,
    PageProfileComponent,
    PageProfileV2Component,      
    PageFaqComponent,    
    SuccessPaymentComponent,
    ErrorPaymentComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NgxEchartsModule,
    NgxGalleryModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  exports: [],
})
export class PagesModule {}
