import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-comments',
  imports: [],
  templateUrl: './post-comments.html',
  styleUrl: './post-comments.scss',
})
export class PostComments implements OnInit{
  ngOnInit(): void {
    this._activatedRoute.parent?.params.subscribe(value => console.log('UserId', value));
  }

  private readonly _activatedRoute = inject(ActivatedRoute);

  @Input() set postId(value: string) {
    console.log('postId', value);
  };



}
