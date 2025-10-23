# 11ty Setup Notes

## Markdown Filter with BEM Classes
```
import markdownIt from "markdown-it";

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true
});

// Add BEM classes to rendered HTML
md.renderer.rules.heading_open = (tokens, idx) => {
  const level = tokens[idx].tag;
  return `<${level} class="post__heading post__heading--${level}">`;
};

md.renderer.rules.paragraph_open = () => {
  return '<p class="post__paragraph">';
};

md.renderer.rules.link_open = (tokens, idx) => {
  return '<a class="post__link" href="' + tokens[idx].attrGet('href') + '">';
};

md.renderer.rules.bullet_list_open = () => {
  return '<ul class="post__list post__list--unordered">';
};

md.renderer.rules.ordered_list_open = () => {
  return '<ol class="post__list post__list--ordered">';
};

md.renderer.rules.list_item_open = () => {
  return '<li class="post__list-item">';
};

md.renderer.rules.hr = () => {
  return '<hr class="post__divider">';
};

md.renderer.rules.blockquote_open = () => {
  return '<blockquote class="post__blockquote">';
};

md.renderer.rules.code_block = (tokens, idx) => {
  return `<pre class="post__code-block"><code class="post__code">${md.utils.escapeHtml(tokens[idx].content)}</code></pre>`;
};

export default function(config) {
  // Add markdown filter
  config.addFilter("markdown", function(content) {
    return md.render(content);
  });
}
```