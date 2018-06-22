# Sea Form

[![Build Status](https://travis-ci.org/Xpertsea/sea-form.svg?branch=master)](https://travis-ci.org/Xpertsea/sea-form)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Includes

### SeaForm

An [iron-form](https://www.webcomponents.org/element/PolymerElements/iron-form) based SeaElement that adds the missing convenience you were looking for in modern forms.

The `sea-form` supports dirty checking. When `dirty-submit-only` is set, submitting the form will only collect changed values.

`is-dirty` will always tell you if the form was modified since it connected.

You can call the `setAsClean()` method any time to reset the initial state to what's currently in the form.

Example:

```html
<sea-form dirty-submit-only is-dirty="{{isMyFormDirty}}">
    <form>
        ...
    </form>
</sea-form>
```

### SeaFormButton

A [paper-button](https://www.webcomponents.org/element/@polymer/paper-button) that can submit an iron-form.

The `sea-form` and `sea-form-button` elements go well together for any kind of forms:

```html
<sea-form on-sea-form-submitted="...">
  <form>
    ...
    <sea-form-button submit>Submit</sea-form-button>
  </form>
</sea-form>
```

### SeaValidatorMixin

A mixin used to implement custom validators, like the included `sea-match-password-validator`.

### SeaMatchPasswordValidator

A SeaValidator that ensures that two password field matches. Example:

```html
<sea-match-password-validator password="[[newPassword]]"></sea-match-password-validator>
<sea-form>
  <form>
    <paper-input name="newPassword"
                 label="New password"
                 type="password"
                 value="{{newPassword}}"></paper-input>
    <paper-input name="confirmNewPassword"
                 label="Confirm new password"
                 type="password"
                 validator="sea-match-password-validator"
                 error-message="Passwords don't match."></paper-input>
    <sea-form-button raised
                     submit>Submit</sea-form-button>
  </form>
</sea-form>
```

## Install

```bash
yarn add @xpertsea/sea-form
```

## Contribute

### VSCode plugins

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Polymer IDE](https://marketplace.visualstudio.com/items?itemName=polymer.polymer-ide)

### Requirements

- [yarn](https://yarnpkg.com/en/docs/install)
- [polymer-cli](https://www.polymer-project.org/3.0/docs/tools/polymer-cli)

### Clone

```bash
git clone git@github.com:Xpertsea/sea-form.git
cd sea-form
yarn install
```

### View documentation

```bash
yarn doc
```

### Test

```bash
yarn test
```

### Lint

```bash
yarn lint
```