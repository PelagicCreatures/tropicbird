# @PelagicCreatures/TropicBird

### Sargasso supervised Google Material Design Objects (MDC)

A tool for simplify & demystify the deployment of Google's Material Design framework. This uses @PelagicCreatures/Sargasso to watch the DOM and Instantiate and destroy MDC Javascript classes on elements when they are added and removed from the DOM making MDC more HIJAX friendly.

Package provide a quick rollup of the un-themed MDC css classes in @PelagicCreatures/TropicBird/dist/bundle.css but you can also roll your own as follows:

```css
$mdc-theme-primary: #333;
$mdc-theme-accent: #b2e800;
$mdc-theme-hint: #1a237e;
$mdc-theme-surface: white;
$darker-accent: #95c200;
@import "@pelagiccreatures/tropicbird/mdc-bundle.css";
```

### Example HTML w/MDC nav, drawer and a switch

```html
<html>
  <head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href='https://cdn.jsdelivr.net/npm/@pelagiccreatures/tropicbird/dist/bundle.css' rel='stylesheet'>
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
