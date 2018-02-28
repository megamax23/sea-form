[![Build Status](https://travis-ci.org/Xpertsea/sea-form.svg?branch=master)](https://travis-ci.org/Xpertsea/sea-form)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# \<sea-form>
**[iron-form](https://www.webcomponents.org/element/PolymerElements/iron-form) based elements that add the missing convenience you were looking for in modern forms**

# Usage
The `sea-form` and `sea-form-button` elements go well together for any kind of forms:
```html
<sea-form on-sea-form-submitted="...">
  <form>
    ...
    <sea-form-button submit>Submit</sea-form-button>
  </form>
</sea-form>
```

The `sea-validator-mixin` can be used to implement your own custom validators, like the included `sea-match-password-validator`:
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

The `sea-form` supports dirty checking. When providing the `dirty-check` attribute, the form will only collect values that the user has changed.
```html
<sea-form dirty-check>
    <form>
        ...
    </form>
</sea-form>
```

When `dirty-check` is enabled, you can call a `setAsClean()` method that will take a snapshot of the current values from which the dirty checking is compared to.

# Add to your app
    bower install --save Xpertsea/sea-form

# Develop

### Requirements
- [yarn](https://yarnpkg.com/en/docs/install)
- [polymer-cli](https://www.polymer-project.org/2.0/docs/tools/polymer-cli)

### VSCode plugins
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Polymer IDE](https://marketplace.visualstudio.com/items?itemName=polymer.polymer-ide)

### Install
    git clone git@github.com:Xpertsea/sea-form.git
    cd sea-form
    yarn install

### View documentation
    yarn doc

### Test
    yarn test

### Lint
    yarn lint
