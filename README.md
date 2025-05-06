Install esbuild on the project folder: <br>
npm install --save-dev esbuild

Add this on package.json:<br>
scripts": {
  "build:js": "esbuild src/js/functions.js --bundle --outfile=docs/js/functions.js --minify --watch --sourcemap",
  "dev": "npm run build:js"
}

Run:<br>
npm run dev