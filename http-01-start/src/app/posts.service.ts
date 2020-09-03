import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title: title,
      content: content
    }
    return this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-55348.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }
      )
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-55348.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders({
        'Custom-Header': 'Custom Data'
      }),
      params: new HttpParams().set('print', 'pretty')
    })
    .pipe(map((responseData) => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
        postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      }) //Catch an error in pipe to do something else with it.
    );
  }

  clearPosts() {
    return this.http.delete('https://ng-complete-guide-55348.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
    )
    .pipe(tap((event) => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
