import { Routes } from '@angular/router';
import { Users } from './componentes/users/users';
import { Posts } from './componentes/posts/posts';
import { PostComments } from './componentes/posts/componentes/post-comments/post-comments';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: Users,
    children: [
      {
        path: 'posts/:userId',
        component: Posts,
        children: [
          {
            path: 'postId/:postId',
            component: PostComments
          }
        ]
      },
    ],
  },
];
