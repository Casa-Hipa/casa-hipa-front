import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { SearchComponent } from './search/search.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  declarations: [UiElementsComponent, SearchComponent, GameDetailComponent],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgbModule,
    RouterModule,
    FormsModule,
  ],
})
export class UiElementsModule {}
