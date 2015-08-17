# gulp-replace-ids

[Gulp](http://gulpjs.com) for replacing ids using predefined
dictionary.

## Install

```sh
$ npm install --save-dev gulp-replace-ids
```

## Usage

```js
var gulp = require('gulp');
var replaceIds = require('gulp-replace-ids');

gulp.task('default', function () {
	return gulp.src('templates/*.tpl')
		.pipe(replaceIds({
          dict: 'build/css_map.json',
          pattern: "{{\ *getCssName\ +\"([a-zA-Z0-9]+)\"\ *}}"
        }))
		.pipe(gulp.dest('build'));
});
```

## API

### jstyle(options)

#### options

##### dict

Type: `String`

Path to the dictionary file.

##### pattern

Type: `String`

RegExp pattern to match ids.
