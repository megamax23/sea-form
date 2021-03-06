import '@polymer/iron-form/iron-form.js'
import { SeaElementMixin } from '@xpertsea/sea-element/sea-element-mixin.js'
const IronForm = customElements.get('iron-form')
/**
* # sea-form
*
* **A form decorator that can be submitted by pressing enter, or by a sea-form-submit event**
*
* Managed inputs must have:
*   - A `name` attribute
*   - A `value` attribute (and dispatch a bubbling & composed `value-changed` event)
*   - A `validate` function
*
* Raises a `sea-form-submitted` event on submit, with the serialized form as detail.
* If `dirtySubmitOnly` is enabled, only changed fields will be sent.
*
* @polymer
* @customElement
* @implements SeaElementMixin
* @mixes SeaElementMixin
* @extends { IronForm }
* @memberof Sea
* @demo demo/index.html
*/
export class SeaForm extends SeaElementMixin(IronForm) {
  static get properties () {
    return {
      /**
      * Whether only dirty values should be submitted
      * @type {Boolean}
      * @default false
      */
      dirtySubmitOnly: {
        type: Boolean,
        value: false
      },

      /**
      * Whether the form is dirty or not
      * @type {Boolean}
      * @default false
      */
      isDirty: {
        type: Boolean,
        notify: true,
        value: false
      },

      /**
      * The list of registered inputs
      * @type {Array}
      * @default []
      */
      _registeredInputs: {
        type: Array,
        value: []
      },

      /**
      * The values to compare dirtiness with
      * @type {Object}
      * @default {}
      */
      _initialValues: {
        type: Object,
        value: {}
      }
    }
  }

  connectedCallback () {
    this.addEventListener('keypress', this._submitOnEnter)
    this.addEventListener('sea-form-submit', this._submitOnSeaSubmit)
    this.addEventListener('iron-form-presubmit', this._submitted)

    this._registeredInputs = []
    this._initialValues = {}
    this._registerAllInputs()

    super.connectedCallback()
  }

  /**
   * Registers an input
   *
   * Registerable inputs must have:
   *   - A `name` attribute
   *   - A notifying `value` property
   *   - A `validate` function
   *
   * @param {Object.HtmlElement} input The input to register
   * @return
   */
  registerInput ({ input }) {
    if (!input ||
      !input.hasAttribute('name') ||
      !('value' in input) ||
      !input.validate) {
      throw new Error(`Input unregisterable: ${input}`)
    }

    const serializedInput = this.__serializeInput({ input })
    this.set('_initialValues', Object.assign({}, this._initialValues, serializedInput))
    this.push('_registeredInputs', input)
    input.addEventListener('value-changed', event => this._inputChanged(event))
  }

  /**
   * Sets current form values as initial values
   *
   * @return
   */
  setAsClean () {
    const currentValues = this.__serializeInputs({ inputs: this._registeredInputs })
    this.setProperties({ isDirty: false, _initialValues: currentValues })
  }

  /**
  * Sets registred input's current value as its initial value
  *
  * @param {Object.HtmlElement} input The input to set as clean
  * @return
  */
  setInputAsClean ({ input }) {
    if (!this._registeredInputs.includes(input)) return
    const currentValue = this.__serializeInput({ input })
    this.set('_initialValues', Object.assign({}, this._initialValues, currentValue))
    this._updateDirtiness()
  }

  /**
   * Serializes the form.
   *
   * If `dirtySubmitOnly` is enabled, only returns changed values
   *
   * @return {Object} The serialized values
   */
  serializeForm () {
    const currentValues = this.__serializeInputs({ inputs: this._registeredInputs })
    if (!this.dirtySubmitOnly) return currentValues
    return Object
      .entries(currentValues)
      .filter(entry => {
        const [name, value] = entry
        return JSON.stringify(value) !== JSON.stringify(this._initialValues[name])
      })
      .reduce((dirtyValues, entry) => {
        const [name, value] = entry
        return Object.assign(dirtyValues, { [name]: value })
      }, {})
  }

  /**
   * Registers all inputs in the form
   *
   * @return
   */
  _registerAllInputs () {
    Array
      .from(this.querySelectorAll('[name]'))
      .filter(element => element.validate && 'value' in element)
      .forEach(element => this.registerInput({ input: element }))
  }

  /**
   * Listens for `keypress` events.
   *
   * Submits form when key is enter.
   *
   * @param {KeyboardEvent} event The `keypress` event
   */
  _submitOnEnter (event) {
    if (event.key !== 'Enter') return
    event.preventDefault()
    this.submit()
  }

  /**
  * Listens for `sea-form-submit` events.
  *
  * Submits form.
  *
  * @param {CustomEvent} event The `sea-form-submit` event
  * @return
  */
  _submitOnSeaSubmit (event) { this.submit() }

  /**
   * Listens for `iron-form-presubmit` events.
   *
   * Cancels default submission and raises a `sea-form-submitted` event with serialized form as detail.
   *
   * @param {CustomEvent} event The `iron-form-presubmit` event
   * @return
   */
  _submitted (event) {
    event.preventDefault()
    this.raise('sea-form-submitted', this.serializeForm())
  }

  /**
   * Updates the `isDirty` property.
   *
   * @return
   */
  _updateDirtiness () {
    const isDirty = this.__isFormDirty({ initialValues: this._initialValues, inputs: this._registeredInputs })
    this.setProperties({ isDirty })
  }

  /**
   * Listens for `value-changed` events.
   *
   * Updates the `isDirty` property.
   *
   * @param {CustomEvent} event The `value-changed` event
   * @return
   */
  _inputChanged (event) {
    this._updateDirtiness()
  }

  __isFormDirty ({ initialValues = {}, inputs = [] }) {
    const currentValues = this.__serializeInputs({ inputs })
    return JSON.stringify(initialValues) !== JSON.stringify(currentValues)
  }

  __serializeInputs ({ inputs = [] }) {
    return inputs
      .map(i => this.__serializeInput({ input: i }))
      .reduce((values, entry) => Object.assign(values, entry), {})
  }

  __serializeInput ({ input }) {
    let value
    const inputType = (input.type || '').toLowerCase()
    switch (inputType) {
      case 'number': {
        value = [undefined, null, ''].includes(input.value)
          ? null
          : parseFloat(input.value)
        break
      }

      case 'text': {
        value = input.value != null ? input.value : ''
        break
      }

      default: { value = input.value }
    }

    return { [input.name]: value }
  }

  /**
  * Raised when form is submitted.
  *
  * Contains serialized form in event details.
  *
  * @event sea-form-submitted
  */
}

customElements.define('sea-form', SeaForm)
