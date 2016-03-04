# ember-cli-active-link-wrapper [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-active-link-wrapper.svg)](http://emberobserver.com/addons/ember-cli-active-link-wrapper) [![Build Status](https://travis-ci.org/alexspeller/ember-cli-active-link-wrapper.svg?branch=master)](https://travis-ci.org/alexspeller/ember-cli-active-link-wrapper)

A simple link wrapper to wrap active links in an element that inherits the link's active class. Useful for e.g. bootstrap where the active class should be on the containing `li` not on the `a`.

## Usage

```hbs
{{#active-link}}
  {{link-to "Index" "index"}}
{{/active-link}}
```

Produces (roughly) the markup:

```html
<li class="active">
    <a href="/" class="active">Index</a>
</li>
```

## Installation

`ember install ember-cli-active-link-wrapper`

## Options

There are several options available to adjust functionality:

| Option        | Default      | Description                                                     |
|---------------|--------------|-----------------------------------------------------------------|
| tagName       | 'li'         | Components HTML tag name                                        |
| activeClass   | _Computed_** | Class name to apply when any child `{{link-to}}` is also active |

** Default class names are pulled from the child `{{link-to}}`,
which in turn defaults to 'active'. You can change it on either
the child `{{link-to}}` or directly on the `{{active-link}}`.
See the examples below.

## Examples

Change the element type by defining the `tagName`.

```hbs
{{#active-link tagName="div"}}
  {{link-to "Index" "index"}}
{{/active-link}}
```

```html
<div class="active">
    <a href="/" class="active">Index</a>
</div>
```

Changing the `activeClass` on the `{{link-to}}` will also change
it on the `{{active-link}}`. Or, you can specifically define what
the `activeClass` will be for the `{{active-link}}`.

```hbs
{{#active-link}}
  {{link-to "Index" "index" activeClass="enabled"}}
{{/active-link}}
{{#active-link activeClass="enabled"}}
  {{link-to "Index" "index"}}
{{/active-link}}
```

```html
<li class="enabled">
    <a href="/" class="enabled">Index</a>
</li>
<li class="enabled">
    <a href="/" class="active">Index</a>
</li>
```

This wrapper is also very useful as a container of a dropdown.
Here is an example of a bootstrap dropdown within a navbar.

```hbs
{{#active-link class="dropdown"}}
  <a class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
  <ul class="dropdown-menu">
    {{#active-link}}
      {{link-to "Index" "index"}}
    {{/active-link}}
    {{#active-link}}
      {{link-to "Other" "other"}}
    {{/active-link}}
  </ul>
{{/active-link}}
```

```html
<li class="dropdown active">
  <a class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
  <ul class="dropdown-menu">
    <li class="active">
      <a href="/" class="active">Index</a>
    </li>
    <li>
      <a href="/other">Other</a>
    </li>
  </ul>
</li>
```

## Running

* `ember server`
* Visit tests at http://localhost:4200/tests.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
