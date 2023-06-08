import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
//import * as echarts from 'echarts';
import {
  RichTextEditorAllModule,
  ToolbarService,
  LinkService,
  HtmlEditorService,
  TableService,
  ImageService,
  QuickToolbarService,
} from '@syncfusion/ej2-angular-richtexteditor';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [BlogPostComponent, BlogListComponent, BlogDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxEchartsModule,
    RichTextEditorAllModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    ToolbarService,
    LinkService,
    HtmlEditorService,
    TableService,
    ImageService,
    QuickToolbarService,
  ],
})
export class BlogsModule {}
