# barebones-project-starter
Barebones scaffold for a web app with grunt dev and dist tasks. Yeoman web-app is better but this is my take on starting with slightly less.

dependencies: npm, grunt, bower

clone the repo

cd into the directory

run "npm install"

run "bower install"

run "grunt"

grunt default task will launch a server at localhost:3000 and set up live updating so that when you modify any of your development files the server will update automatically.

grunt build task will create a dist directory with minified assets and html. The html urls are created with grunt-processhtml. They require specifically formatted comments in the build html file. Use index.html as a reference.
