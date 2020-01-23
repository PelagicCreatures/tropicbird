# @PelagicCreatures/TropicBird

### Sargasso supervised Google Material Design Objects (MDC)

[Demo Page](https://blog.myanti.social/demos/tropicbird)

A tool to simplify & demystify the deployment of Google's Material Design framework. This uses @PelagicCreatures/Sargasso to watch the DOM and Instantiate and destroy MDC Javascript classes on elements when they are added and removed from the DOM making MDC HIJAX friendly.

TropicBird also provides some built in management of the nav bar 'hamburger' icon to open the drawer and a couple utility methods for opening modal dialogs, queuing snackbar messages and triggering the progress bar but otherwise the implementation is pure MDC as described [here](https://github.com/material-components/material-components-web/tree/master/packages).

#### boot Sargasso and TropicBird
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@pelagiccreatures/sargasso/dist/sargasso.es.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@pelagiccreatures/tropicbird/dist/tropicbird.es.js"></script>
<script type="module">
	bootSargasso({hijax:{}})
	let tropicBird = new TropicBird(document.body, {})
	tropicBird.start()
</script>
```

Any MDC elements in your document will be now be automatically instantiated.


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

The package provide a quick rollup of the un-themed MDC css classes in @PelagicCreatures/TropicBird/dist/bundle.css but you can also roll your own as follows:


```scss
$mdc-theme-primary: #333;
$mdc-theme-accent: #b2e800;
$mdc-theme-hint: #1a237e;
$mdc-theme-surface: white;
$darker-accent: #95c200;
@import "@pelagiccreatures/tropicbird/mdc-bundle.scss";
```

### Example HTML w/MDC nav, drawer and a switch just for fun

```html
<html>
  <head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@pelagiccreatures/tropicbird/dist/bundle.css" rel="stylesheet">
    <style>
      body { margin:0; padding:0; }
      #content { padding-top:65px; }
			hamburger { text-decoration:none; }
    </style>
  </head>
  <body data-sargasso-class="TropicBird">
    <script type="module" src="https://cdn.jsdelivr.net/npm/@pelagiccreatures/sargasso/dist/sargasso.es.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@pelagiccreatures/tropicbird/dist/tropicbird.es.js"></script>
    <script type="module">
      bootSargasso({hijax:{}})
    </script>

    <aside class="nav-drawer drawer-top mdc-drawer mdc-drawer--dismissible">
      <div class="mdc-drawer__content">
        <nav class="mdc-list">
          <a class="nav-item mdc-list-item" href="#">
            <i class="material-icons mdc-list-item__graphic">person_add</i>
            <span class="mdc-list-item__text">Menu Item</span>
          </a>
          <a class="nav-item mdc-list-item" href="#">
            <i class="material-icons mdc-list-item__graphic">person_add</i>
            <span class="mdc-list-item__text">Menu Item</span>
          </a>
        </nav>
      </div>
    </aside>
    <div class="mdc-drawer-scrim"></div>

    <div class="mdc-drawer-app-content">
      <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a class="hamburger material-icons mdc-top-app-bar__navigation-icon" href="#">menu</a>
          </section>
        </div>
      </header>
    </div>

    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell--span-12">
          <div data-hijax id="content">

            <p>The top bar and drawer and the switch below are ready to use. When the next page is loaded the wrapper elements (nav, drawer) continue to run while the switch will be unloaded and destroyed.<p>

            <a href="page-1.html">Next page in HIJAX</a>

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
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```
