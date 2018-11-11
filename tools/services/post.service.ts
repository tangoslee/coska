// import { Observable } from 'rxjs/Observable';
import * as uniqid from 'uniqid';
import { FakePost, Util } from '../libs';
import 'rxjs/add/observable/fromPromise';
import { Post } from '../../src/app/core/models';

export class PostService {

  state: any;

  constructor(private util: Util = new Util()) {
    this.state = this.util.loadJSON(`${__dirname}/../../src/assets/api/init.json`);
  }

  createFakePosts(n: number = 100, output: string): Promise<any> {

    const writes = [];
    this.util.mkdir(output);

    for (let i = 0; i < n; i++) {
      const post = new FakePost(output);
      const result = this.util.writeFile(`${output}/${post.id}.md`, post.toString());
      writes.push(result);
    }

    return Promise.all(writes);
  }

  createPostSkelton({ ppgid, pgid, layout }): Promise<any> {

    const { assets } = this.state;
    const postId = uniqid();
    const fullPath = `${assets}/${layout}/${ppgid}/${pgid}/${postId}`;
    const post = new Post({ id: postId });

    return Promise.all([
      this.util.mkdir(fullPath, true),
      this.util.writeFile(`${fullPath}.md`, post.toString()),
    ]);

  }
}
