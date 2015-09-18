# pluginTemplate

Starter for jQuery plugins by Pagepro.

## Why and how?

1. You can easly create jQuery plugins.
2. Just copy files, change the name and start coding.

## Requirements
1. node & npm
2. sass
3. **gulp-cli** node package installed globally:
`npm install -g gulp-cli`

## Installation

```shell
cd package_directory
npm install
```

## Gulp Tasks

### Default Task

This task is used for development.

What it does?

1. Compiles SASS (src/sass) files.
2. Copies src/js files into JS (dist).
3. Running BrowserSync file server that allows refreshing CSS files without browser refresh.

```shell
gulp
```
