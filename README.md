# pink_tiger_burger_builder
pandabc (panda bila cerkva) burger shop website with burger builder

#### Modules and environment
- Due to big headache with Node12 and Gulp4 and work must flow!? decide go to older versions of Node and Gulp4
* Using Gulp 3 and NodeJS 8.16.0
```bash
$npm install -g n
$n 8.16.0
$npm install gulp@3.9.1
$npm install
```
* "browser-sync": "^2.26.7",
* "g": "^2.0.1",
* "gulp-cssmin": "^0.2.0",
* "gulp-html-minify": "0.0.14",
* "gulp-image": "^4.3.0",
* "gulp-minify": "^3.1.0",
* "gulp-sass": "^4.0.2"

#### Project folder structure
```bash
#/.git
#/node_modules
#package-lock.json
#/dist  <- minified files
# this kind of files not upload to github
/src
 index.html
    /css  <-sass ans css
      main.sass
      menu.sass
    /js   <-js
      script.js
    /json <-source files (db)
      productdb.json
      jsonReadme.md <-some explanations
    /img  <-images
.gitignore
gulpfile.js
package.json
README.md

```
