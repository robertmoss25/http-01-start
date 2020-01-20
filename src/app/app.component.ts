import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.postService.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createandStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.postService.fetchPost();
  }

  onClearPosts() {
    
  }
}
