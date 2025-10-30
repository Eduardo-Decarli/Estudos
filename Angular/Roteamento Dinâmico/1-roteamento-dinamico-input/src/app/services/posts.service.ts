import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly _http = inject(HttpClient);

  getUserPosts(userId: string): Observable<IPost[]> {
    return this._http.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
