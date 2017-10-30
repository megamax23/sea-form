[![Build Status](https://travis-ci.org/Xpertsea/sea-form.svg?branch=master)](https://travis-ci.org/Xpertsea/sea-form)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# \<sea-form>
**An iron-form that can be submitted by pressing enter, or by a sea-form-submit event**

# Usage
```html
<sea-form on-sea-form-submitted="...">
  <form>
    ...
    <sea-form-button submit>Submit</sea-form-button>
  </form>
</sea-form>
```

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
