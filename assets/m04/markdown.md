# ngx-markdown

## Installation

```bash
npm install --save ngx-markdown prismjs
```

## Configuration

- Set angular.json

```json
    "styles": [
        "node_modules/prismjs/themes/prism-okaidia.css"
    ],
    "scripts": [
        "node_modules/marked/lib/marked.js",
        "node_modules/prismjs/prism.js"
    ]
```

- Set app/app.module.ts

```javascript
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

@NgModule({
  imports: [
    MarkdownModule.forRoot({
        markedOptions: {
            provide: MarkedOptions,
            useValue: {
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
            },
        },
    }),
  ],
})
```

- or Set app/core/core.module.ts

```javascript
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    MarkdownModule.forChild()
  ],
})
```
@see:

- <https://www.npmjs.com/package/ngx-markdown>
- <https://learn-the-web.algonquindesign.ca/topics/markdown-yaml-cheat-sheet/>
