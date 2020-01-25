import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap} from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService 
{
    error = new Subject<string>();
    constructor(private http: HttpClient) {}

    createandStorePost(title: string, content: string) 
    {
        // https://ng-complete-guide-48ed3.firebaseio.com/
        const postData: Post = {title: title, content: content}
        this.http
        .post<{name: string}>('https://ng-complete-guide-48ed3.firebaseio.com/posts.json',
        postData,
        {
            observe: 'response'
        }
        )
        .subscribe(responseData => 
        {
            console.log(responseData);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPost() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');
        return this.http.get<{[key: string]:Post}>(
            'https://ng-complete-guide-48ed3.firebaseio.com/posts.json', {
                headers: new HttpHeaders({'Custom-Header': 'Hello'}),
                params: searchParams
            }
        )
        .pipe(
            map(responseData => {
                const postsArray: Post[] = [];
                for(const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postsArray.push({ ...responseData[key], id: key});
                    }
                }
                return postsArray;
            }),
            catchError(errorRes => {
                return throwError(errorRes);
            })
        )
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-48ed3.firebaseio.com/posts.json',
        {
            observe: 'events'
        }).pipe(
            tap(event => {
                console.log(event);
                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }
            })
        );
    }
}