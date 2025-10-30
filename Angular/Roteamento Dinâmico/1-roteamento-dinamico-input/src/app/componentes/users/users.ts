import { Component, inject, OnInit } from '@angular/core';
import { IUser, UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, RouterLink, RouterOutlet],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  usersList$: Observable<IUser[]> = of([]);
  private readonly _userService = inject(UserService);

  ngOnInit(): void {
  this.usersList$ = this._userService.getUsers();
  }
}
