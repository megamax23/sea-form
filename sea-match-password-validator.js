import { SeaElement } from '@xpertsea/sea-element/sea-element.js'
import { SeaValidatorMixin } from './sea-validator-mixin.js'

/**
* # sea-match-password-validator
*
* **Validates if two passwords match perfectly**
*
* ## Usage
* ```html
* <sea-match-password-validator password="[[_newPassword]]"></sea-match-password-validator>
* <sea-form>
*   <form>
*     <paper-input name="newPassword"
*                  type="password"
*                  value="{{_newPassword}}"></paper-input>
*     <paper-input name="confirmNewPassword"
*                  type="password"
*                  validator="sea-match-password-validator"
*                  error-message="Passwords do not match."></paper-input>
*
*     <sea-form-button submit>Submit</sea-form-button>
*   </form>
* </sea-form>
* ```
*
* @polymer
* @customElement
* @implements SeaValidatorMixin
* @mixes SeaValidatorMixin
* @extends { SeaElement }
* @memberof Sea
* @demo demo/index.html
*/
export class SeaMatchPasswordValidator extends SeaValidatorMixin(SeaElement) {
  static get is () { return 'sea-match-password-validator' }

  static get properties () {
    return {
      /**
      * The initial password to validate the confirmation against
      * @type {String}
      */
      password: String
    }
  }

  /**
   * Validates that the confirmed password matches
   *
   * @override
   * @param {String} confirmedPassword The password to validate
   * @return {Boolean} Whether the confirmed password matched
   */
  validate (confirmedPassword) { return confirmedPassword === this.password }
}

customElements.define(SeaMatchPasswordValidator.is, SeaMatchPasswordValidator)
