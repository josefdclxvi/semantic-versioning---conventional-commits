# Demo for Semantic Versioning and Conventinal Commits

## Setup Husky, Commitlint, and Vitest

This uses **Husky** for Git hooks, **Commitlint** to enforce commit message standards, and **Vitest** for running tests.

## 🚀 Setup Instructions

### 1. Install Dependencies

To set up the project with all necessary tools:

```bash
npm i
```

### 2. Initialize Husky

Set up Husky to manage Git hooks:

```bash
npm run prepare
```

## Setup Github Release

**Release-it** is a command-line tool used for automating the process of versioning and releasing software. It helps with tasks like creating a new version, generating changelogs, tagging releases, and publishing them to GitHub, GitLab, or npm. It simplifies the release workflow by streamlining the steps involved in preparing and publishing a release

but in this case just run **npm install**

## 🚀 Setup Instructions for Release-it

- install

```bash
  npm install --save-dev release-it @release-it/conventional-changelog
```

- add **release-it** in package.json

```json
  "release-it": {
    "git": {
      "commitMessage": "chore(release): ${version}",
      "tagName": "v${version}"
    },
    "github": {
      "release": true
    },
    "plugins": {
      "@release-it/conventional-changelog": {
        "preset": {
          "name": "conventionalcommits",
          "types": [
            {
              "type": "feat",
              "section": "Features"
            },
            {
              "type": "fix",
              "section": "Bug Fixes"
            },
            // some other conventional commit types
          ]
        },
        "infile": "CHANGELOG.md"
      }
    }
  }
```
