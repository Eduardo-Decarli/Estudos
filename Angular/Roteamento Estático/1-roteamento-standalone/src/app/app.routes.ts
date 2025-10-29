import { Routes } from '@angular/router';
import { Primeiro } from './components/primeiro/primeiro';
import { Segundo } from './components/segundo/segundo';
import { Base } from './components/base/base';
import { Inicial } from './components/inicial/inicial';

// export const routes: Routes = [
//   { path: 'primeiro', component: Primeiro },
//   { path: 'segundo', component: Segundo }
// ];

export const routes: Routes = [
  { path: '', component: Inicial},
  { path: 'components', loadComponent: () => import('./components/base/base').then(m => m.Base)},
  { path: 'components/primeiro', component: Primeiro },
  { path: 'components/segundo', component: Segundo },
];
