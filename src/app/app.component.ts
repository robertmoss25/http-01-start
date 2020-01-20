import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // https://ng-complete-guide-48ed3.firebaseio.com/
    this.http
      .post(
        'https://ng-complete-guide-48ed3.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    
  }

  private fetchPosts() {
    this.http.get('https://ng-complete-guide-48ed3.firebaseio.com/posts.json').subscribe(posts => {
      console.log(posts);
    });
  }
}
