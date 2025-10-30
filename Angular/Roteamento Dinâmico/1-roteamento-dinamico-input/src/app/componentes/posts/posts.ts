import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPost, PostsService } from '../../services/posts.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit {
  postsList$: Observable<IPost[]> = of([]);

  @Input() set userId(value: string) {
    this.postsList$ = this._postsService.getUserPosts(value);
  }

  private readonly _postsService = inject(PostsService);

  ngOnInit() {
    console.log('Posts component carregado')
  }

}
