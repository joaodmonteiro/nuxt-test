# Nuxt 2 Template

## Setup

```bash
# Install dependencies:
$ npm install

# Start the development server:
$ npm run dev

# Build the application for production:
$ npm run build
```

For a detailed explanation of how things work, please refer to the [Nuxt 2 documentation](https://nuxtjs.org).

## Commit Message Guidelines

We follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/), which ensures commit messages are easy to read and follow when looking through a project's history.

### Commit Message Format

Each commit message should consist of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory, and the scope is optional. Any line of the commit message cannot be longer than 100 characters.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit, where the hash is the SHA of the reverted commit.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should provide additional contextual information, such as:

- **assets**
- **components**
- **deps**
- **deps-dev**
- **layouts**
- **nuxt**
- **package**
- **pages**
- **plugins**
- **router**
- **static**
- **store**

### Subject

The subject should contain a succinct description of the change and use the imperative, present tense: "change", not "changed" nor "changes". The first letter of the subject's first word should not be captialised, and full stops should not be used.

### Body

Just as in the subject, use the imperative, present tense: "change", not "changed" nor "changes". The body should include the motivation for the change and contrast this with the previous behaviour.

### Footer

The footer should contain information about breaking changes and is also the place to reference GitHub issues that the commit closes. Breaking changes should start with the word `BREAKING CHANGE:` with a space or two newlines, followed by the rest of the commit message.

## Recommended Reading

- [Code Guide](https://codeguide.co)
- [Commitizen CLI](https://github.com/commitizen/cz-cli)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [CSS Guidelines](https://github.com/chris-pearce/css-guidelines)
- [Dependabot](https://dependabot.com/)
- [ESLint](https://eslint.org/)
- [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist/)
- [GitHub Actions](https://github.com/features/actions)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Namespacing](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- [npm](https://www.npmjs.com)
- [Nuxt](https://nuxtjs.org/)
- [PostCSS](https://postcss.org/)
- [Prettier](https://prettier.io/)
- [Sass](https://sass-lang.com/documentation/)
- [Semantic Pull Requests](https://probot.github.io/apps/semantic-pull-requests/)
- [stylelint](https://stylelint.io/)
- [Vue.js](https://v2.vuejs.org/)
