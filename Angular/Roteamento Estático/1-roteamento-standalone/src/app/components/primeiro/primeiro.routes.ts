import { Routes } from "@angular/router"
import { Primeiro } from "./primeiro";
import { FilhoA } from "./components/filho-a/filho-a";
import { FilhoB } from "./components/filho-b/filho-b";

export const PrimeiroRoutes: Routes = [
  {
    path: '',
    component: Primeiro,
    children: [
      { path: 'filho-a', title: 'filho-a', component: FilhoA },
      { path: 'filho-b', title: 'filho-b', component: FilhoB },
    ],
  },
];

