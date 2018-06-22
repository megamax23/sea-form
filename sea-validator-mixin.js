import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js'
import { IronMeta } from '@polymer/iron-meta/iron-meta.js'

/**
* # sea-validator-mixin
*
* **Rough port from [iron-validator-behavior](https://www.webcomponents.org/element/PolymerElements/iron-validator-behavior),
* Used to implement custom form validators**
*
* Implementation should override the `validate` method, which is used by iron-form.
*
* **Important:**
*
* Don't include implementation directly in the form!
* Put it just before but outside, otherwise the form will try to validate it as an input and fail
*
* Implementations must also define a "static get is" otherwise they won't be registered properly.
*
* @polymer
* @mixinFunction
* @memberof Sea
*/
export const SeaValidatorMixin = dedupingMixin(base =>

  /**
  * @polymer
  * @mixinClass
  */
  class SeaValidatorMixin extends base {
    constructor () {
      super()
      new IronMeta({ // eslint-disable-line no-new
        type: 'validator',
        key: this.constructor.is,
        value: this
      })
    }

    /**
     * Validates a form field
     *
     * @param {*} value The value to validate
     * @return {Boolean} Whether the value is valid
     */
    validate (value) { }
  })
