import { Routes } from '@angular/router';
import { Primeiro } from './components/primeiro/primeiro';
import { Segundo } from './components/segundo/segundo';
import { Inicial } from './components/inicial/inicial';
import { PaginaNaoEncontrada } from './components/pagina-nao-encontrada/pagina-nao-encontrada';
import { FilhoA } from './components/primeiro/components/filho-a/filho-a';
import { FilhoB } from './components/primeiro/components/filho-b/filho-b';

// export const routes: Routes = [
//   { path: 'primeiro', component: Primeiro },
//   { path: 'segundo', component: Segundo }
// ];

export const routes: Routes = [
  // {
  //   path: '',
  //   title: 'Index',
  //   component: Inicial
  // },
  {
    path: '',
    redirectTo: '/components',
    pathMatch: 'full'
  },
  {
    path: 'components',
    title: 'Componentes',
    loadComponent: () => import('./components/base/base').then((m) => m.Base),
  },
  {
    path: 'components/primeiro',
    title: 'Primeiro',
    loadChildren: () => import('./components/primeiro/primeiro.routes').then(m => m.PrimeiroRoutes)
  },
  { path: 'components/segundo', title: 'Segundo', component: Segundo },
  { path: '**', title: 'Página Não Encontrada', component: PaginaNaoEncontrada },
];
