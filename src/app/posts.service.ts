import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService 
{
    constructor(private http: HttpClient) {}

    createandStorePost(title: string, content: string) 
    {
        // https://ng-complete-guide-48ed3.firebaseio.com/
        const postData: Post = {title: title, content: content}
        this.http
        .post<{name: string}>('https://ng-complete-guide-48ed3.firebaseio.com/posts.json',postData)
        .subscribe(responseData => 
        {
            console.log(responseData);
        });
    }

    fetchPost() {
        return this.http.get<{[key: string]:Post}>(
            'https://ng-complete-guide-48ed3.firebaseio.com/posts.json'
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
            })
        )
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-48ed3.firebaseio.com/posts.json');
    }
}