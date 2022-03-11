import { Sargasso, utils } from '@pelagiccreatures/sargasso'

import { html, render } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'

class ButtonComponent extends Sargasso {
	constructor (element, options) {
		options.shadowDOM = true
		super(element, options)

		// attributes that affect structure of template - requires template rebuild and render
		this.templateAttributes = ['raised', 'unelevated', 'outlined', 'icon-leading', 'icon-trailing', 'icon']

		// observed attributes - change will trigger render only
		this.renderAttributes = ['label','disabled']

		// all attributes to observe
		this.watchAttributes = this.templateAttributes.concat(this.renderAttributes)

		// current attribute values
		this.templateOptions = {}
		this.renderOptions = this.observableStart('MDCOptions-' + this.uid, {})

		this.getAttributes()
	}

	start () {
		super.start()
		
		this.setTemplateArgs(this.getObservable("MDCOptions-" + this.uid))
		this.buildTemplate()
		this.setRenderer(render) // set lit-html render() as the renderer

		// handle changes to host element attributes
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
		let iconLeading, iconTrailing

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
		if(this.templateOptions['icon-leading']) {
			classes.push('mdc-button--icon-leading')
			iconLeading = html`<i class="material-icons mdc-button__icon" aria-hidden="true">${this.templateOptions.icon}</i>`
		}
		if(this.templateOptions['icon-trailing']) {
			classes.push('mdc-button--icon-trailing')
			iconTrailing = html`<i class="material-icons mdc-button__icon" aria-hidden="true">${this.templateOptions.icon}</i>`
		}

		const buttonClasses = classes.join(' ')

		const template = args => html`
			<link href="/dist/button.css" rel="stylesheet">
			<link href="/dist/icons.css" rel="stylesheet">
			<div class="mdc-touch-target-wrapper">
				<button class="${buttonClasses}" ?disabled=${args.disabled}>
					<span class="mdc-button__ripple"></span>
					<span class="mdc-button__touch"></span>
					${iconLeading}
					<span class="mdc-button__label">${args.label}</span>
					${iconTrailing}
				</button>
			</div>
		`

		this.setTemplate(template) // set template function
	}

	sleep () {
		this.attributeObserver.disconnect();
		super.sleep()
	}
}

utils.registerSargassoClass('ButtonComponent', ButtonComponent)

export {
	ButtonComponent
}
