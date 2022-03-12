import { Sargasso, utils } from '@pelagiccreatures/sargasso'
import { html, render } from 'lit-html'
import { MDCRipple } from 'material-components-web/node_modules/@material/ripple'

class ButtonComponent extends Sargasso {
	constructor (element, options) {
		options.shadowDOM = true
		super(element, options)

		this.pendingLinkTagCount = 2 // pending css files in component

		// attributes that affect structure of template - requires template rebuild and render
		this.templateAttributes = ['raised', 'unelevated', 'outlined', 'icon-leading', 'icon-trailing', 'icon']

		// observed attributes - change will trigger render only
		this.renderAttributes = ['label','disabled']

		// all attributes to observe
		this.watchAttributes = this.templateAttributes.concat(this.renderAttributes)

		// current attribute values
		this.templateOptions = {}
		this.renderOptions = this.observableStart('MDCOptions-' + this.uid, {})

		this.getAttributes() // get attributes from host element
	}

	start () {
		super.start()

		this.elegant() // set up graceful rendering kludge
		this.setTemplateArgs(this.renderOptions.data)
		this.buildTemplate() // build and install lit-html template
		this.setRenderer(render) // set lit-html render() as the renderer

		// watch for changes to host element attributes
		this.attributeObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === "attributes") {
					if(this.watchAttributes.indexOf(mutation.attributeName) !== -1) {
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

		const template = args => html`
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

	sleep () {
		if(this.buttonRipple) { this.buttonRipple.destroy() }

		if(this.attributeObserver) {
			this.attributeObserver.disconnect();
		}
		if(this.styleObserver) {
			this.styleObserver.disconnect();
		}
		super.sleep()
	}

	_render () {
		super._render()

		// do any needed mdc instantiations here

		let el = this.element.querySelector('.mdc-button')
		if(el && !el.classList.contains('mdc-ripple-upgraded ')) {
			if(this.buttonRipple) { this.buttonRipple.destroy() }
			this.buttonRipple = new MDCRipple(el);
		}
	}

	elegant () {

		// convoluted scheme to cover janky rendering by hiding element until all the css is ready within the component

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

utils.registerSargassoClass('ButtonComponent', ButtonComponent)

export {
	ButtonComponent
}
