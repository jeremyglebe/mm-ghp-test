# Jeremy's Place

The Vue-powered, Markdown-first source for [jeremy.place](https://jeremy.place).
VitePress turns the files in `_posts/` into static pages; GitHub Pages hosts the
generated site. There is no database, login, or posting interface.

## Publish a post

1. Add `_posts/YYYY-MM-DD-short-slug.md`.
2. Start it with this front matter:

   ```yaml
   ---
   title: "A clear post title"
   date: 2026-08-23
   description: "One or two sentences used on the post list and in link previews."
   tags:
     - project
     - update
   categories:
     - Blog
   ---
   ```

3. Write the rest in normal Markdown.
4. Commit and push to `master`. The GitHub Pages workflow builds and publishes it.

The date prefix is removed from the public URL, so the example above becomes
`/posts/short-slug/`. Put images in `public/assets/posts/` and reference them
as `/assets/posts/...`.

## Work locally

```sh
npm install
npm run dev
```

The development server prints the local URL. Restart it after adding or renaming a
post so the new route is registered. Use `npm run build` to run the same static
build used by GitHub Pages.

## Deployment

The repository deploys only through GitHub Pages. In the repository settings,
Pages must use **GitHub Actions** as its source. `public/CNAME` preserves the
`jeremy.place` custom domain, and `public/.nojekyll` prevents a second Jekyll
pass over the generated files.
