import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from '../games/search/search.component';
import { PageBlankComponent } from '../pages/page-blank/page-blank.component';
import { PageProfileComponent } from '../pages/page-profile/page-profile.component';
import { PageProfileV2Component } from '../pages/page-profile-v2/page-profile-v2.component';

import { PageFaqComponent } from '../pages/page-faq/page-faq.component';
import { FormsValidationComponent } from '../form/forms-validation/forms-validation.component';
import { BlogListComponent } from '../blogs/blog-list/blog-list.component';
import { BlogDetailsComponent } from '../blogs/blog-details/blog-details.component';
import { FormsBasicComponent } from '../form/forms-basic/forms-basic.component';
import { BlogPostComponent } from '../blogs/blog-post/blog-post.component';
import { GameDetailComponent } from '../games/game-detail/game-detail.component';
import { UsersComponent } from '../users/users.component';
import { SuccessPaymentComponent } from '../authentication/success-payment/success-payment.component';
import { ErrorPaymentComponent } from '../authentication/error-payment/error-payment.component';
import { ListadoTiendaComponent } from '../tienda/listado-tienda/listado-tienda.component';
import { VentasComponent } from '../reportes/ventas/ventas.component';
import { EventosComponent } from '../reportes/eventos/eventos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        children: [
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          {
            path: 'index',
            component: IndexComponent,
            data: { title: ':: Casa Hipa :: Dashboard :: Analytical ::' },
          },
        ],
      },

      {
        path: 'games',
        children: [
          { path: '', redirectTo: 'games', pathMatch: 'full' },
          {
            path: 'search',
            component: SearchComponent,
            data: { title: ':: Casa Hipa :: Games ::' },
          },
          {
            path: 'game-detail/:id',
            component: GameDetailComponent,
            data: { title: ':: Casa Hipa :: Games ::' },
          },
        ],
      },
      {
        path: 'reports',
        children: [
          { path: '', redirectTo: 'reports', pathMatch: 'full' },
          {
            path: 'sells',
            component: VentasComponent,
            data: { title: ':: Casa Hipa :: Ventas ::' },
          },
          {
            path: 'events',
            component: EventosComponent,
            data: { title: ':: Casa Hipa :: Eventos ::' },
          },
        ],
      },
      {
        path: 'store',
        children: [
          { path: '', redirectTo: 'store', pathMatch: 'full' },
          {
            path: 'list',
            component: SearchComponent,
            data: { title: ':: Casa Hipa :: Store ::' },
          },
          {
            path: 'list-store',
            component: ListadoTiendaComponent,
            data: { title: ':: Casa Hipa :: Store ::' },
          },
        ],
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'pages',
        children: [
          { path: '', redirectTo: 'page-blank', pathMatch: 'full' },
          {
            path: 'page-blank',
            component: PageBlankComponent,
            data: { title: ':: Casa Hipa :: Pages :: Blank ::' },
          },

          {
            path: 'page-profile',
            component: PageProfileComponent,
            data: { title: ':: Casa Hipa :: Pages :: Profile ::' },
          },
          {
            path: 'page-profile2/:email',
            component: PageProfileV2Component,
            data: { title: ':: Casa Hipa :: Pages :: Profile - V2 ::' },
          },


          {
            path: 'page-faq',
            component: PageFaqComponent,
            data: { title: ':: Casa Hipa :: Pages :: Faq ::' },
          },
        ],
      },
      {
        path: 'forms',
        children: [
          { path: '', redirectTo: 'forms-validation', pathMatch: 'full' },
          {
            path: 'forms-validation',
            component: FormsValidationComponent,
            data: { title: ':: Casa Hipa :: Form Validations :: Forms ::' },
          },
          {
            path: 'forms-basic',
            component: FormsBasicComponent,
            data: { title: ':: Casa Hipa :: Form Basic :: Forms ::' },
          },
        ],
      },
      {
        path: 'blogs',
        children: [
          { path: '', redirectTo: 'blog-post', pathMatch: 'full' },
          {
            path: 'blog-post',
            component: BlogPostComponent,
            data: { title: ':: Casa Hipa :: Blog Post :: Blog ::' },
          },
          {
            path: 'blog-list',
            component: BlogListComponent,
            data: { title: ':: Casa Hipa :: Blog List :: Blog ::' },
          },
          {
            path: 'blog-details',
            component: BlogDetailsComponent,
            data: { title: ':: Casa Hipa :: Blog Details :: Blog ::' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
