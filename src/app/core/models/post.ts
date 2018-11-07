const imagePattern = /!\[[^\]]+\]\(([^\)]+)\)/;

export class Post {

  zzz: string;

  private _id: string;
  private _title?: string;
  private _desc?: string;
  private _body?: string;
  private _publishedAt?: any;
  private _coverImage?: string;
  private _link?: string;

  constructor({ id, title, desc, body, publishedAt, coverImage, link }: any) {

    if (id) this.id = id;
    if (title) this.title = title;
    if (desc) this.desc = desc;
    if (body) this.body = body;
    if (publishedAt) this.publishedAt = publishedAt;
    if (coverImage) this.coverImage = coverImage;
    if (link) this.link = link;
  }

  // setters
  set id(id) {
    this._id = id;
  }

  set title(title) {
    this._title = title;
  }

  set desc(desc) {
    this._desc = desc;
  }

  set body(body) {
    this._body = body;
  }

  set publishedAt(publishedAt) {
    this._publishedAt = publishedAt;
  }

  set coverImage(coverImage) {
    this._coverImage = coverImage;
  }

  set link(link) {
    this._link = link;
  }

  // getters
  get id() {
    return this._id;
  }

  get title() {
    return this._title
      ? this._title
      : this.id.split('-').reduce((_title, word) => {
          return `${_title} ${word.charAt(0).toUpperCase()}${word.substring(1)}`.trim();
        }, '');
  }

  get desc() {
    return this._desc
      ? this._desc
      : this.body
          .replace(imagePattern, '')
          .replace(/\s{2,}/gs, ' ')
          .substring(0, 200)
          .trim();
  }

  get body() {
    return this._body ? this._body : '';
  }

  get publishedAt() {
    return this._publishedAt ? this._publishedAt : new Date().toString();
  }

  get coverImage() {
    const images = this.body.match(imagePattern);
    const image = images ? images[1] : '';
    let coverImage = this._coverImage ? this._coverImage : image;
    if (coverImage) {
      const [, name, ext] = coverImage.match(/(.*)\.([^\.]+$)/);
      return `${name}_300x0.${ext}`;
    }
    return coverImage;
  }

  toString(): string {
    const coverImage = this.coverImage ? `coverImage: ${this.coverImage}` : '';
    return `
---
id: ${this.id}
title: ${this.title}
publishedAt: ${this.publishedAt}
desc: ${this.desc}
${coverImage}
---

${this.body}
`;
  }
}
