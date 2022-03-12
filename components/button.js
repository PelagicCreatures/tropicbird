import { utils } from '@pelagiccreatures/sargasso'
import { html } from 'lit-html'
import { MDCRipple } from '@material/ripple'
import { MDCComponent } from './component.js'

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
	ButtonComponent
}
