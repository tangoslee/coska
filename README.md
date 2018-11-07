# TemplateEngineAngular

This version is a draft.

- Live Demo: https://tangoslee.github.io/coska

- Repository: https://github.com/tangoslee/coska/tree/tangoslee

## Features

- Responsive Design.

- Supporting maintenance Status.

- Supporting HTML, XML, Markdown contents.

- Centralized state management by NgRx 

## Directory Structure

```bash
.
├── app.component.css
├── app.component.html
├── app.component.spec.ts
├── app.component.ts
├── app.module.ts
├── app-routing.module.ts
├── core
│   ├── components
│   │   ├── alerts
│   │   ├── index.ts
│   │   ├── loading
│   │   ├── pagination
│   │   └── undermaintenance
│   ├── core.module.ts
│   ├── intercepters
│   │   ├── http-token-interceptor.ts
│   │   └── index.ts
│   ├── models
│   │   ├── doc-meta.ts
│   │   ├── index.ts
│   │   ├── maintenance.ts
│   │   ├── meetup.ts
│   │   └── menu.ts
│   ├── pipes
│   │   ├── index.ts
│   │   ├── safe-html.pipe.spec.ts                // sanitize undafe HTML
│   │   ├── safe-html.pipe.ts
│   │   ├── truncate.pipe.spec.ts                 // trucate string
│   │   └── truncate.pipe.ts
│   └── services
│       ├── api.service.spec.ts
│       ├── api.service.ts
│       ├── app.service.spec.ts
│       ├── app.service.ts
│       └── index.ts
├── home
│   ├── components
│   │   ├── breadcrumb                            // breadcrumb
│   │   ├── contents
│   │   │   ├── contents.component.ts             // contents factory
│   │   │   ├── html                              // html content handler
│   │   │   ├── index.ts
│   │   │   ├── markdown                          // markdown content handler
│   │   │   └── xml                               // xml content handler (XML + XSL)
│   │   ├── footer
│   │   ├── index.ts
│   │   ├── navibar                               // main navigation
│   │   └── sidebar                               // sidebar
│   ├── home.module.spec.ts
│   ├── home.module.ts
│   ├── home-routing.module.ts
│   ├── pages
│   │   ├── index.ts
│   │   └── main                                  // bootstraping page
│   └── services
│       ├── home.service.spec.ts
│       ├── home.service.ts
│       └── index.ts
└── store                                         // state management
    ├── actions
    │   └── app.action.ts
    ├── app.states.ts
    ├── effects
    │   └── app.effect.ts
    └── reducers
        └── app.reducer.ts

27 directories, 87 files
```

## Static File Structure

```bash
assets/
├── api
│   └── init.json                       // menu
├── m01
│   ├── m010101.html
│   ├── m010102.html
│   ├── m010103.html
│   ├── m010201.html
│   ├── m010202.html
│   ├── m010203.html
│   └── m010204.html
├── m02
│   ├── m020101.html
│   ├── m020102.html
│   └── m020201.html
├── m03
│   ├── m030102.html
│   ├── m030103.html
│   └── m030201.html
├── m04
│   ├── food.xml
│   ├── food.xsl
│   ├── maria.png
│   ├── markdown.md
│   ├── rss-canada.xml
│   └── rss-canada.xsl
├── section
│   ├── index.json                      // A list file that contains all posts meta
│   ├── xxxx.md                         // A single post with the id: xxxx
│   ├── xxxx                            // The post which id xxxx directory for images
│       └── image1.jpg                  // images of the post
└── test.json
```

## Routing Plan

| Method | URL                      | Desc                                                                                                                                       |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | /home/:menuId/:subMenuId | Display a single content when the subMenu.type in (html, markdown, xml) <br/> Display the contents list when the subMenu.type in (section) |
| GET    | /posts/:postId            | Display a post by postId |