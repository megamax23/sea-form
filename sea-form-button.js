import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js'
import '@polymer/paper-button/paper-button.js'
import { addListener, removeListener } from '@polymer/polymer/lib/utils/gestures.js'
import { SeaElementMixin } from '@xpertsea/sea-element/sea-element-mixin.js'
const PaperButton = customElements.get('paper-button')

/**
* # sea-form-button
*
* **A [paper-button](https://www.webcomponents.org/element/PolymerElements/paper-button) that can submit a sea-form**
*
* Can be configured to raise a `sea-form-submit` event when tapped
*
* @polymer
* @customElement
* @implements { SeaElementMixin, GestureEventListeners }
* @mixes SeaElementMixin
* @mixes GestureEventListeners
* @extends { PaperButton }
* @memberof Sea
* @demo demo/index.html
*/
export class SeaFormButton extends
  GestureEventListeners(
    SeaElementMixin(
      PaperButton)) {
  static get properties () {
    return {
      /**
      * Whether tapping this button will raise a `sea-form-submit` event
      * @type {Boolean}
      */
      submit: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    addListener(this, 'tap', this._raiseSubmit)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    removeListener(this, 'tap', this._raiseSubmit)
  }

  /**
   * Listens for `tap` gesture events.
   *
   * If submit is true, raises a `sea-form-submit` event.
   * @return
   */
  _raiseSubmit () { if (this.submit === true) this.raise('sea-form-submit') }

  /**
  * Raised when button is tapped and submit is true.
  *
  * @event sea-form-submit
  */
}

customElements.define('sea-form-button', SeaFormButton)
