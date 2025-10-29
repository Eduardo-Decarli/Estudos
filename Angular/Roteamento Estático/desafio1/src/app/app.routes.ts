import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio';
import { Info } from './componentes/info/info';
import { Contacts } from './componentes/contacts/contacts';
import { About } from './componentes/about/about';
import { Leave } from './componentes/leave/leave';

export const routes: Routes = [
  { path: 'index', title: 'index', component: Inicio },
  { path: 'info', component: Info },
  { path: 'contacts', component: Contacts },
  { path: 'about', component: About },
  { path: 'logout', title: 'logout', component: Leave },
];
