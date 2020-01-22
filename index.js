import {
	MDCRipple
}
	from '@material/ripple'

import {
	MDCLineRipple
}
	from '@material/line-ripple'

import {
	MDCTopAppBar
}
	from '@material/top-app-bar'

import {
	MDCDrawer
}
	from '@material/drawer'

import {
	MDCDialog
}
	from '@material/dialog'

import {
	MDCTextField
}
	from '@material/textfield'

import {
	MDCSelect
}
	from '@material/select'

import {
	MDCSwitch
}
	from '@material/switch'

import {
	MDCSnackbar
}
	from '@material/snackbar'

import {
	MDCFormField
}
	from '@material/form-field'

import {
	MDCCheckbox
}
	from '@material/checkbox'

import {
	MDCLinearProgress
}
	from '@material/linear-progress'

import {
	MDCChipSet
}
	from '@material/chips'

/* TODO ??

MDCTextFieldIcon,
MDCTextFieldHelperText,

import {
	MDCTextFieldIcon
}
from '@material/textfield/icon';

import {
	MDCTextFieldHelperText
}
from '@material/textfield/helper-text';
*/

class Reaper extends Sargasso {
	destroy () {
		if (this.options.MDCThing && this.options.MDCThing.destroy) {
			this.options.MDCThing.destroy()
		}
		super.destroy()
	}
}

registerSargassoClass('Reaper', Reaper)

class TropicBird extends Sargasso {
	constructor (element, options = {}) {
		options.watchDOM = true
		super(element, options)
		this.topAppBar = null
		this.drawer = null
		this.snackBar = null
		this.linearProgress = null
		this.snackBarTimer = null
		this.snackBarQueue = []
		this.linearProgressTimer = null
		this.manageMDCInstances()
	}

	DOMChanged () {
		this.manageMDCInstances()
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
			this.mdcDialog = new MDCDialog(dialogContainer)
			this.mdcDialog.listen('MDCDialog:closed', (e) => {
				elementTools.removeClass(document.body, 'modal-open')
				document.getElementById('ephemeral').getElementsByClassName('mdc-dialog')[0].remove()
				resolve(e.detail.action)
			})
			elementTools.addClass(document.body, 'modal-open')
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
			}, delay)
		} else {
			if (this.linearProgressTimer) {
				clearTimeout(this.linearProgressTimer)
				this.linearProgressTimer = null
			} else {
				this.linearProgress.close()
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

	manageMDCInstances () {
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
			'.mdc-icon-button',
			'.mdc-card__primary-action'
		]

		const wantRipple = [
			'mdc-fab',
			'mdc-button',
			'mdc-icon-button',
			'mdc-card__primary-action'
		]

		const elements = document.querySelectorAll(managedClasses.join(','))
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i]
			if (!elementTools.hasClass(element, 'mdc-instantiated')) {
				elementTools.addClass(element, 'mdc-instantiated')

				if (elementTools.hasClass(element, 'mdc-top-app-bar')) {
					this.topAppBar = new MDCTopAppBar(element)
					new Reaper(element, {
						MDCThing: this.topAppBar
					})
				}

				if (elementTools.hasClass(element, 'mdc-drawer')) {
					this.drawer = new MDCDrawer(element)
					new Reaper(element, {
						MDCThing: this.drawer
					})

					// close the drawer on any click
					element.onclick = (e) => {
						e.preventDefault()
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

					// toggle the drawer when hamburger clicked
					const hamburger = document.querySelector('.hamburger')
					if (hamburger) {
						hamburger.onclick = (e) => {
							e.preventDefault()
							this.drawer.open = !this.drawer.open
						}
					}
				}

				if (elementTools.hasClass(element, 'mdc-snackbar')) {
					this.snackBar = new MDCSnackbar(element)
					new Reaper(element, {
						MDCThing: this.snackBar
					})
				}

				if (elementTools.hasClass(element, 'mdc-linear-progress')) {
					this.linearProgress = new MDCLinearProgress(element)
					new Reaper(element, {
						MDCThing: this.linearProgress
					})
				}

				if (elementTools.hasClass(element, 'mdc-text-field')) {
					const thing = new MDCTextField(element)
					new Reaper(element, {
						MDCThing: thing
					})
				}

				if (elementTools.hasClass(element, 'mdc-select')) {
					const thing = new MDCSelect(element)
					new Reaper(element, {
						MDCThing: thing
					})
				}

				if (elementTools.hasClass(element, 'mdc-switch')) {
					const thing = new MDCSwitch(element)
					new Reaper(element, {
						MDCThing: thing
					})
				}

				if (elementTools.hasClass(element, 'mdc-chip-set')) {
					const thing = new MDCChipSet(element)
					new Reaper(element, {
						MDCThing: thing
					})
				}

				for (let j = 0; j < wantRipple.length; j++) {
					if (elementTools.hasClass(element, wantRipple[j])) {
						const thing = new MDCRipple(element)
						new Reaper(element, {
							MDCThing: thing
						})
					}
				}
			}
		}
	}
}

if (window) {
	window.TropicBird = TropicBird
}

registerSargassoClass('TropicBird', TropicBird)

export {
	TropicBird,
	MDCRipple,
	MDCLineRipple,
	MDCTopAppBar,
	MDCDrawer,
	MDCDialog,
	MDCTextField,
	MDCSnackbar,
	MDCFormField,
	MDCCheckbox,
	MDCSelect,
	MDCSwitch,
	MDCLinearProgress,
	MDCChipSet
}
