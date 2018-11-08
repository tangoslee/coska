import { Observable } from 'rxjs/Observable';
import * as uniqid from 'uniqid';
import { FakePost, Util } from '../libs';
import 'rxjs/add/observable/fromPromise';
import { Post } from '../../src/app/core/models';

export class PostService {
  constructor(private util: Util = new Util()) {}

  createFakePosts(n: number = 100, output: string = null): Observable<any> {
    const writes = [];
    this.util.mkdir(output);
    for (let i = 0; i < n; i++) {
      const post = new FakePost(output);
      const result = this.util.writeFile(`${output}/${post.id}.md`, post.toString());
      writes.push(result);
    }

    return Observable.fromPromise(Promise.all(writes));
  }

  createPostSkelton(path: string): Observable<any> {
    let [menuId, subMenuId, postId] = path.split('/');

    if (!menuId && !subMenuId) {
      throw Observable.throw('Invalid format: /menuId/subMenuId is required');
    }

    if (postId === undefined || !postId.trim()) {
      postId = uniqid();
      path = `${path}/${postId}`;
    }
    const fullPath = `./src/assets/section/${path}`;
    const post = new Post({ id: postId });

    // console.log({ menuId, subMenuId, postId });
    return Observable.fromPromise(
      Promise.all([
        this.util.mkdir(fullPath),
        this.util.writeFile(`${fullPath}.md`, post.toString()),
      ])
    );
  }
}
