# @PelagicCreatures/TropicBird

### Sargasso supervised Google Material Design Objects (MDC)

[Demo Page](https://blog.PelagicCreatures.com/demos/tropicbird)

A tool to simplify & demystify the deployment of Google's Material Design framework. This uses @PelagicCreatures/Sargasso to watch the DOM and Instantiate and destroy MDC Javascript classes on elements when they are added and removed from the DOM making MDC HIJAX friendly.

TropicBird also provides some built in management of the nav bar 'hamburger' icon to open the drawer and a couple utility methods for opening modal dialogs, queuing snackbar messages and triggering the progress bar but otherwise the implementation is pure MDC as described [here](https://github.com/material-components/material-components-web/tree/master/packages).

#### boot Sargasso and TropicBird (example uses CDN modules)
```html
<!DOCTYPE html>
<html>
  <head>
    <link href='https://cdn.jsdelivr.net/npm/@pelagiccreatures/tropicbird/dist/bundle.css' rel='stylesheet'>
  </head>
  <body data-sargasso-class="TropicBird">
    <section>
      <h3>Here is a switch. </h3>
      <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input class="mdc-switch__native-control" type="checkbox" name="some name">
          </div>
        </div>
      </div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/@pelagiccreatures/sargasso/dist/sargasso.iife.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@pelagiccreatures/tropicbird/dist/tropicbird.iife.js"></script>
    <script defer>
      window.onload= () => {
        SargassoModule.utils.bootSargasso({hijax:{}})
      }
    </script>
  </body>
</html>
```

Any MDC elements in your document will be now be automatically instantiated.

[Try It](https://jsfiddle.net/PelagicCreatures/jsqm6crf/)


| method | description |
| ------ | ----------- |
| dialog (target, title, content, canCancel) | open a dialog box. `target` is a selector for the dialog template, `title` and `content` are the text of the dialog and `canCancel` controls whether the cancel button is shown |
| progressBar (show, delay = 500)  | show  to toggle the progress "loading" bar |
| pushSnackBar (level, message, timer = 6000) | Pop up a message in the snack bar |


```javascript
tropicBird.pushSnackBar('info','hi!',3000)

setTimeout(()=>{
	tropicBird.progressBar(true) // show the progress bar
	tropicBird.pushSnackBar('info','Look! A Progress Bar!',3000)
	setTimeout(()=>{
		tropicBird.progressBar(false) // hide it
	},5000)
},5000)
```

The dialog implementation expects an html template to exist in the document which is cloned and launched as an MDCDialog. The id of the template is the 'target' used in tropicBird.dialog()

```html
<div id="dialog" class="mdc-dialog"
	role="alertdialog"
	aria-modal="true"
	aria-labelledby="my-dialog-title"
	aria-describedby="my-dialog-content">
	<div class="mdc-dialog__container">
		<div class="mdc-dialog__surface">
			<h2 class="mdc-dialog__title"></h2>
			<div class="mdc-dialog__content"></div>
			<footer class="mdc-dialog__actions">
				<button type="button" class="mdc-button mdc-dialog__button mdc-dialog-cancel" data-mdc-dialog-action="no">
					<span class="mdc-button__label">Cancel</span>
				</button>
				<button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
					<span class="mdc-button__label">OK</span>
				</button>
			</footer>
		</div>
	</div>
	<div class="mdc-dialog__scrim"></div>
</div>
```

#### Pose the dialog
```javascript
tropicBird.dialog('#dialog','title','content',true).then((action) =>{
	tropicBird.pushSnackBar('info',action,3000)
}).catch((e)=>{
	console.log(e)
})
```

### Example HTML w/MDC nav, drawer, dialog, progress bar and a some inputs just for fun

[Try It](https://jsfiddle.net/PelagicCreatures/8m2hus1q/8/)


### Bundling with your project

The package provide a quick rollup of the un-themed MDC css classes in @PelagicCreatures/TropicBird/dist/bundle.css but you can also roll your own as follows:

```
npm install npx -g
npm install @pelagiccreatures/tropicbird --save-dev
npm install webpack  --save-dev
npm install autoprefixer --save-dev
npm install sass --save-dev
npm install file-loader --save-dev
npm install extract-loader --save-dev
npm install css-loader --save-dev
npm install sass-loader --save-dev
npm install postcss-loader --save-dev
npm install material-design-icons-iconfont --save-dev
npm install @PelagicCreatures/Sargasso
npm install @PelagicCreatures/TropicBird
```

my-bundle.scss
```scss
@import "@material/theme/mdc-theme";
:root {
	--mdc-theme-primary: #333;
	--mdc-theme-secondary: #b2e800;
	--mdc-theme-accent: #b2e800;
	--mdc-theme-hint: #1a237e;
	--mdc-theme-surface: white;
}
@import "@pelagiccreatures/tropicbird/mdc-bundle.scss";

$material-design-icons-font-directory-path: '~material-design-icons-iconfont/dist/fonts/';
@import 'material-design-icons-iconfont/src/material-design-icons';

```

webpack.config.js
```
const autoprefixer = require('autoprefixer')
const path = require('path')

const cssConfig = {
	entry: ['./my-bundle.scss'],
	output: {
		path: path.resolve(__dirname, 'public')
	},
	mode: 'development',
	watchOptions: {
		poll: 1000 // Check for changes every second
	},
	target: 'web',
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'bundle.css'
				}
			}, {
				loader: 'extract-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader',
				options: {
					implementation: require('sass'),
					webpackImporter: false,
					sassOptions: {
						includePaths: ['./node_modules']
					}
				}
			}, {
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: () => [autoprefixer()]
					}
				}
			}]
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts/',
					publicPath: '/public/fonts/'
				}
			}]
		}]
	}
}

module.exports = [
	cssConfig
]
```

Run webpack
```
npx webpack
```
