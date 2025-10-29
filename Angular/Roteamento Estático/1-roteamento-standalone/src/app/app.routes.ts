import { Routes } from '@angular/router';
import { Primeiro } from './components/primeiro/primeiro';
import { Segundo } from './components/segundo/segundo';
import { Base } from './components/base/base';

// export const routes: Routes = [
//   { path: 'primeiro', component: Primeiro },
//   { path: 'segundo', component: Segundo }
// ];

export const routes: Routes = [
  { path: 'components', component: Base},
  { path: 'components/primeiro', component: Primeiro },
  { path: 'components/segundo', component: Segundo },
];
