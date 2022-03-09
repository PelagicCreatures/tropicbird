import * as mdc from 'material-components-web'

import {
	Sargasso, utils
}
	from '@pelagiccreatures/sargasso'

const MDC = {}

for (const prop in mdc) {
	const re = new RegExp('^MDC' + prop + '$', 'i')
	for (const lib in mdc[prop]) {
		if (lib.match(re)) {
			MDC[lib] = mdc[prop][lib]
		}
	}
}

class Reaper extends Sargasso {
	constructor (element, options) {
		super(element, {})
		this.MDCClassName = options.MDCThing.constructor.name
		this.setMetaData(this.MDCClassName, options.MDCThing)
	}

	destroy () {
		const thing = this.getMetaData(this.MDCClassName)
		this.setMetaData(this.MDCClassName, null)
		if (thing && thing.destroy) {
			thing.destroy()
		}
		super.destroy()
	}
}

utils.registerSargassoClass('Reaper', Reaper)

class TropicBird extends Sargasso {
	constructor (element, options = {}) {
		options.watchDOM = true
		super(element, options)
		this.topAppBar = null
		this.drawer = null
		this.snackBar = null
		this.snackBarTimer = null
		this.snackBarQueue = []
		this.linearProgress = null
		this.linearProgressTimer = null
		this.linearProgressOpen = false
		this.manageMDCInstances()
	}

	DOMChanged (root) {
		this.manageMDCInstances(root)
	}

	makeEphemeral () {
		if (!document.getElementById('ephemeral')) {
			const ephemeral = document.createElement('div')
			ephemeral.setAttribute('id', 'ephemeral')
			document.body.append(ephemeral)
		}
	}

	dialog (target, title, content, canCancel) {
		this.makeEphemeral()
		const template = document.querySelector(target).outerHTML
		document.getElementById('ephemeral').innerHTML = template
		const dialogContainer = document.getElementById('ephemeral').getElementsByClassName('mdc-dialog')[0]
		const titleContainer = dialogContainer.getElementsByClassName('mdc-dialog__title')[0]
		const contentContainer = dialogContainer.getElementsByClassName('mdc-dialog__content')[0]
		const cancelButton = dialogContainer.getElementsByClassName('mdc-dialog-cancel')[0]

		titleContainer.textContent = title
		contentContainer.textContent = content
		if (canCancel) {
			cancelButton.style.display = 'flex'
		} else {
			cancelButton.style.display = 'none'
		}

		return new Promise((resolve, reject) => {
			this.mdcDialog = new mdc.dialog.MDCDialog(dialogContainer)
			this.mdcDialog.listen('MDCDialog:closed', (e) => {
				utils.elementTools.removeClass(document.body, 'modal-open')
				document.getElementById('ephemeral').getElementsByClassName('mdc-dialog')[0].remove()
				resolve(e.detail.action)
			})
			utils.elementTools.addClass(document.body, 'modal-open')
			this.mdcDialog.open()
		})
	}

	progressBar (show, delay = 500) {
		if (show === true) {
			if (this.linearProgressTimer) {
				clearTimeout(this.linearProgressTimer)
				this.linearProgressTimer = null
			}
			this.linearProgressTimer = setTimeout(() => {
				this.linearProgressTimer = null
				this.linearProgress.open()
				this.linearProgressOpen = true
			}, delay)
		} else {
			if (this.linearProgressTimer) {
				clearTimeout(this.linearProgressTimer)
				this.linearProgressTimer = null
			}
			if (this.linearProgressOpen) {
				this.linearProgress.close()
				this.linearProgressOpen = false
			}
		}
	}

	pushSnackBar (level, message, timer = 6000) {
		this.snackBarQueue.push({
			level: level,
			message: message,
			timer: timer
		})

		if (!this.snackBarTimer) {
			this.popSnackBar()
		}
	}

	popSnackBar () {
		const item = this.snackBarQueue.shift()

		const elem = document.querySelector('.mdc-snackbar__label')
		if (!elem || !this.snackBar) {
			confirm(item.message)
			if (this.snackBarQueue.length) {
				this.popSnackBar()
			}
		} else {
			elem.innerText = item.message

			this.snackBar.open()

			this.snackBarTimer = setTimeout(() => {
				this.snackBarTimer = null
				this.snackBar.close()
				if (this.snackBarQueue.length) {
					this.popSnackBar()
				}
			}, item.timer)
		}
	}

	manageMDCInstances (root = document) {
		const managedClasses = [
			'.mdc-top-app-bar',
			'.mdc-drawer',
			'.mdc-snackbar',
			'.mdc-linear-progress',
			'.mdc-text-field',
			'.mdc-select',
			'.mdc-switch',
			'.mdc-chip-set',
			'.mdc-fab',
			'.mdc-button',
			'.mdc-tab-bar',
			'.mdc-tab-scroller'
		]

		const wantRipple = [
			'mdc-fab',
			'mdc-button'
		]

		const elements = root.querySelectorAll(managedClasses.join(','))
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i]
			if (!utils.elementTools.hasClass(element, 'mdc-instantiated')) {
				utils.elementTools.addClass(element, 'mdc-instantiated')

				if (utils.elementTools.hasClass(element, 'mdc-top-app-bar')) {
					this.topAppBar = new mdc.topAppBar.MDCTopAppBar(element)
					const r = new Reaper(element, {
						MDCThing: this.topAppBar
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-drawer')) {
					this.drawer = new mdc.drawer.MDCDrawer(element)
					const r = new Reaper(element, {
						MDCThing: this.drawer
					})
					r.start()

					// close the drawer on any click
					element.onclick = (e) => {
						this.drawer.open = !this.drawer.open
					}

					// close the drawer when click outside drawer
					const scrim = document.querySelector('.mdc-drawer-scrim')
					if (scrim) {
						scrim.onclick = (e) => {
							e.preventDefault()
							this.drawer.open = !this.drawer.open
						}
					}
				}

				if (utils.elementTools.hasClass(element, 'mdc-snackbar')) {
					this.snackBar = new mdc.snackbar.MDCSnackbar(element)
					const r = new Reaper(element, {
						MDCThing: this.snackBar
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-linear-progress')) {
					this.linearProgress = new mdc.linearProgress.MDCLinearProgress(element)
					const r = new Reaper(element, {
						MDCThing: this.linearProgress
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-text-field')) {
					const thing = new mdc.textField.MDCTextField(element)
					const r = new Reaper(element, {
						MDCThing: thing
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-select')) {
					const thing = new mdc.select.MDCSelect(element)
					const r = new Reaper(element, {
						MDCThing: thing
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-switch')) {
					const thing = new mdc.switchControl.MDCSwitch(element)
					const r = new Reaper(element, {
						MDCThing: thing
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-chip-set')) {
					const thing = new mdc.chips.MDCChipSet(element)
					const r = new Reaper(element, {
						MDCThing: thing
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-tab-bar')) {
					const thing = new mdc.tabBar.MDCTabBar(element)
					const r = new Reaper(element, {
						MDCThing: thing
					})
					r.start()
				}

				if (utils.elementTools.hasClass(element, 'mdc-tab-scroller')) {
					const thing = new mdc.tabScroller.MDCTabScroller(element)
					const r = new Reaper(element, {
						MDCThing: thing
					})
					r.start()
				}

				for (let j = 0; j < wantRipple.length; j++) {
					if (utils.elementTools.hasClass(element, wantRipple[j])) {
						const thing = new mdc.ripple.MDCRipple(element)
						const r = new Reaper(element, {
							MDCThing: thing
						})
						r.start()
					}
				}
			}
		}

		// toggle the drawer when hamburger clicked
		const hamburger = document.querySelector('.hamburger')
		if (hamburger) {
			hamburger.onclick = (e) => {
				e.preventDefault()
				this.drawer.open = !this.drawer.open
			}
		}
	}
}

utils.registerSargassoClass('TropicBird', TropicBird)

export {
	TropicBird,
	MDC,
	mdc
}
