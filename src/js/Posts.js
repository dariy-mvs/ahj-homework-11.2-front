import { ajax } from 'rxjs/ajax';
import {
  interval, of,
} from 'rxjs';
import {
  map, catchError, switchMap,
} from 'rxjs/operators';

export default class Posts {
  constructor() {
    this.server = 'https://t2hw11.herokuapp.com';
    this.serverPosts = 'https://t2hw11.herokuapp.com/posts/latest';
    // this.server = 'http://localhost:7070';
    // this.serverPosts = 'http://localhost:7070/posts/latest';
    this.posts = document.querySelector('.posts__list');
  }

  init() {
    interval(3000).pipe(
      switchMap(() => ajax(this.serverPosts).pipe(
        map((result) => result.response),
        catchError(() => of({ timestamp: new Date().toLocaleString('ru'), posts: [] })),
      )),
      switchMap((result) => {
        const receivedData = result || { timestamp: new Date().toLocaleString('ru'), posts: [] };
        receivedData.forEach((item) => {
          this.getComments(item);
        });
        return receivedData;
      }),
    ).subscribe(() => {

    });
  }
  //   data$.subscribe((result) => {
  //     const receivedData = result || { timestamp: new Date().toLocaleString('ru'), posts: [] };
  //     receivedData.forEach((item) => {
  //       this.getComments(item);
  //     });
  //   });
  // }

  getComments(post) {
    // console.log(post);
    const postWithComment = post;
    const { id } = postWithComment;
    const serverComments = `${this.server}/posts/${id}/comments/latest`;
    ajax(serverComments).pipe(
      map((result) => result.response),
      catchError(() => of({ timestamp: new Date().toLocaleString('ru'), comments: [] })),
    ).subscribe((resultComment) => {
      const receivedDataComment = resultComment || { timestamp: new Date().toLocaleString('ru'), comments: [] };
      postWithComment.comments = receivedDataComment;
      this.posts.prepend(this.renderPost(postWithComment));
    });
  }

  renderPost(post) {
    this.post = document.createElement('li');
    this.post.className = 'post';
    const timeFormat = { minute: '2-digit', hour: '2-digit' };
    const dateFormat = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const created = new Date(post.created);
    this.post.innerHTML = `
    <div class="post__title_box">
    <img src="${post.avatar}" alt="author avatar" class="post__ava">
    <span class="post__author">${post.author}</span>
    <span class="post__date">${created.toLocaleString('ru', timeFormat)} ${created.toLocaleString('ru', dateFormat)}</span>
  </div>
  <img src="${post.image}" alt="post img" class="post__img">`;
    if (post.comments.length !== 0) {
      const commentsBox = document.createElement('div');
      commentsBox.className = 'comments___box';
      commentsBox.innerHTML = `
    <span class="comments__title">Comments</span>
    <ul class="comments__list"></ul>`;
      post.comments.forEach((el) => {
        const comment = document.createElement('li');
        comment.className = 'comment';
        comment.innerHTML = `<img src="${el.avatar}" alt="comment author avatar" class="comment__author_img">
      <span class="comment__author_name">${el.author}</span>
      <span class="comment__date">${el.created}</span>
      <p class="comment__text">${el.content}</p>`;
        commentsBox.querySelector('.comments__list').insertAdjacentElement('beforeend', comment);
      });
      this.post.insertAdjacentElement('beforeend', commentsBox);
    }

    return this.post;
  }
}
