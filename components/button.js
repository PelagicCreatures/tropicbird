import { Sargasso, utils } from '@pelagiccreatures/sargasso'
import { html, render } from 'lit-html'
import { MDCRipple } from '@material/ripple'

class MDCComponent extends Sargasso {
	constructor (element, options) {
		options.shadowDOM = true
		super(element, options)

		this.toDestroy = [] // push any MDC things you instantiate into this array so they can be destroyed on sleep

		// attributes that affect structure of template - requires template rebuild and render
		this.templateAttributes = []

		// observed attributes - change will trigger render only
		this.renderAttributes = []

		// current attribute values
		this.templateOptions = {}
		this.renderOptions = this.observableStart('MDCOptions-' + this.uid, {})
	}

	start () {
		super.start()
		this.getAttributes()
		this.watchAttributes() // watch attributes on host element
		this.setTemplateArgs(this.renderOptions.data)
		this.buildTemplate() // build and install lit-html template
		this.elegant() // set graceful rendering kludge
		this.setRenderer(render) // set lit-html render() as the renderer
	}

	watchAttributes () {
		// all attributes to observe
		this.allAttributes = this.templateAttributes.concat(this.renderAttributes)

		// watch for changes to host element attributes
		this.attributeObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === "attributes") {
					if(this.allAttributes.indexOf(mutation.attributeName) !== -1) {
						this.getAttributes()
						if(this.templateAttributes.indexOf(mutation.attributeName) !== -1) {
							this.buildTemplate()
							this.render()
						}
					}
				}
			})
		})

		this.attributeObserver.observe(this._hostElement, {
			attributes: true
		})
	}

	getAttributes () {
		for(const attr of this.templateAttributes) {
			this.templateOptions[attr] = this._hostElement.getAttribute(attr) || this._hostElement.hasAttribute(attr)
		}

		for(const attr of this.renderAttributes) {
			this.renderOptions.data[attr] = this._hostElement.getAttribute(attr) || this._hostElement.hasAttribute(attr)
		}
	}

	buildTemplate () {
		const template = args => html`
			<style>
				.web-component-body {
					opacity: 0;
					transition: opacity .25s ease-in-out;
				}
				.web-component-body--loaded { opacity: 1; }
			</style>
			<div class="web-component-body">
				<p>default buildTemplate - override buildTemplate</p>
			</div>
		`
		this.setTemplate(template) // set template function
	}

	sleep () {
		if(this.toDestroy) {
			for(const destroyable of this.toDestroy) {
				destroyable.destroy()
			}
		}

		if(this.attributeObserver) {
			this.attributeObserver.disconnect();
		}

		if(this.styleObserver) {
			this.styleObserver.disconnect();
		}
		super.sleep()
	}

	// do any needed mdc instantiations here - don't forget to destroy them in sleep()

	instantiateMDC () {}

	_render () {
		super._render()
		this.pendingLinkTagCount = this.element.querySelectorAll('link').length
		this.instantiateMDC()
	}

	elegant () {

		// convoluted scheme to cover janky rendering
		// hide element until all the css is ready within the component

		var nodes = ["LINK"];

		var nodeLoaded = (e) => {
			e.target.removeEventListener("load", nodeLoaded);
			if(!--this.pendingLinkTagCount) {
				this.element.querySelector('.web-component-body').classList.add('web-component-body--loaded')
				this.styleObserver.disconnect()
			}
		}

		this.styleObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				for (var i = 0; i < mutation.addedNodes.length; i++) {
					var node = mutation.addedNodes[i];
					if (nodes.indexOf(node.nodeName.toUpperCase()) !== -1) {
						node.addEventListener("load", nodeLoaded);
					}
				}
			})
		})

		this.styleObserver.observe(this.element, {
			childList:true
		});
	}
}

utils.registerSargassoClass('MDCComponent', MDCComponent)

class ButtonComponent extends MDCComponent {
	constructor (element, options) {
		options.shadowDOM = true
		super(element, options)

		// attributes that affect structure of template - requires template rebuild and render
		this.templateAttributes = ['raised', 'unelevated', 'outlined', 'icon-leading', 'icon-trailing', 'icon']

		// observed attributes - change will trigger render only
		this.renderAttributes = ['label','disabled']
	}

	buildTemplate () {

		let iconLeading = html``
		let iconTrailing  = html``
		var classes = ['mdc-button']
		if(this.templateOptions.raised) {
			classes.push('mdc-button--raised')
		}
		if(this.templateOptions.unelevated) {
			classes.push('mdc-button--unelevated')
		}
		if(this.templateOptions.outlined) {
			classes.push('mdc-button--outlined')
		}
		if(this.templateOptions['icon-leading'] && this.templateOptions.icon) {
			classes.push('mdc-button--icon-leading')
			iconLeading = html`<i class="material-icons mdc-button__icon" aria-hidden="true">${this.templateOptions.icon}</i>`
		}
		if(this.templateOptions['icon-trailing'] && this.templateOptions.icon) {
			classes.push('mdc-button--icon-trailing')
			iconTrailing = html`<i class="material-icons mdc-button__icon" aria-hidden="true">${this.templateOptions.icon}</i>`
		}

		const buttonClasses = classes.join(' ')

		const template = (args) => html`
			<style>
				.web-component-body {
					opacity: 0;
					transition: opacity .25s ease-in-out;
				}
				.web-component-body--loaded { opacity: 1; }
			</style>
			<link href="/dist/button.css" rel="stylesheet">
			<link href="/dist/icons.css" rel="stylesheet">
			<div class="web-component-body">
				<div class="mdc-touch-target-wrapper">
					<button class="${buttonClasses}" ?disabled=${args.disabled}>
						<span class="mdc-button__ripple"></span>
						<span class="mdc-button__touch"></span>
						${iconLeading}
						<span class="mdc-button__label">${args.label}</span>
						${iconTrailing}
					</button>
				</div>
			</div>
		`
		this.setTemplate(template) // set template function
	}

	instantiateMDC () {
		let el = this.element.querySelector('.mdc-button')
		if(el && !el.classList.contains('mdc-ripple-upgraded ')) {
			if(this.buttonRipple) { this.buttonRipple.destroy() }
			this.buttonRipple = new MDCRipple(el)
			this.toDestroy.push(this.buttonRipple)
		}
	}
}

utils.registerSargassoClass('ButtonComponent', ButtonComponent)

export {
	MDCComponent,
	ButtonComponent
}
