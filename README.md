# ember-cli-active-link-wrapper

A simple link wrapper to wrap active links in an element that inherits the link's active class. Useful for e.g. bootstrap where the active class should be on the containing `li` not on the `a`.

## Usage

```hbs
{{#active-link}}
  {{link-to "Index" "index"}}
{{/active-link}}
```

Produces (roughly) the markup:

```html
<li class='active'>
    <a href="/" class='active'>Index</a>
</li>
```

You can change the tagName if you like, the default is `li`:

```hbs
{{#active-link tagName='div'}}
  {{link-to "Index" "index"}}
{{/active-link}}
```

```html
<div class='active'>
    <a href="/" class='active'>Index</a>
</div>
```

## Installation

`ember install:addon ember-cli-active-link-wrapper`

## Running

* `ember server`
* Visit tests at http://localhost:4200/tests.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
