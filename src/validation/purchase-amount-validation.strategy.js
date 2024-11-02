// @ts-check
import Validator from '../lib/Validator.js';
import {
  isDivisibleByNumber,
  isIntegerNumericString,
  isNotEmptyString,
  isNumericString,
  isPositiveNumericString,
} from '../lib/utils.js';

import ValidationStrategy from './validation.strategy.js';

class PurchaseAmountValidationStrategy extends ValidationStrategy {
  /** @type {string} */
  #purchaseAmount;

  static STRATEGY = Object.freeze({
    DIVISOR: 1000,
  });

  static ERROR_MESSAGE = Object.freeze({
    AMOUNT_CAN_NOT_BE_EMPTY: '[ERROR] 빈 값은 입력할 수 없어요',
    AMOUNT_MUST_BE_POSITIVE_INTEGER: '[ERROR] 양의 정수만 입력할 수 있어요',
    AMOUNT_CAN_NOT_BE_ZERO: '[ERROR] 0은 입력할 수 없어요',
    AMOUNT_MUST_BE_IN_MULTIPLES_OF_DIVISOR: `[ERROR] ${PurchaseAmountValidationStrategy.STRATEGY.DIVISOR} 단위로만 입력할 수 있어요`,
  });

  /**
   *
   * @param {string} purchaseAmount
   */
  constructor(purchaseAmount) {
    super();

    this.#purchaseAmount = purchaseAmount;
  }

  /**
   *
   * @param {string} purchaseAmount
   * @returns {boolean}
   */
  #isNotEmpty(purchaseAmount) {
    return isNotEmptyString(purchaseAmount);
  }

  /**
   *
   * @param {string} purchaseAmount
   * @returns {boolean}
   */
  #isPositiveInteger(purchaseAmount) {
    return (
      isNumericString(purchaseAmount) &&
      isIntegerNumericString(purchaseAmount) &&
      isPositiveNumericString(purchaseAmount)
    );
  }

  /**
   *
   * @param {number} purchaseAmount
   * @returns {boolean}
   */
  #isNotZero(purchaseAmount) {
    return purchaseAmount !== 0;
  }

  /**
   *
   * @param {number} purchaseAmount
   * @returns {boolean}
   */
  #isDivisible(purchaseAmount) {
    return isDivisibleByNumber(purchaseAmount, PurchaseAmountValidationStrategy.STRATEGY.DIVISOR);
  }

  /**
   *
   * @param {Validator} validator
   * @returns {Validator}
   */
  #validatePurchaseAmount(validator) {
    return validator
      .validate(this.#purchaseAmount)
      .with(this.#isNotEmpty, {
        message: PurchaseAmountValidationStrategy.ERROR_MESSAGE.AMOUNT_CAN_NOT_BE_EMPTY,
      })
      .with(this.#isPositiveInteger, {
        message: PurchaseAmountValidationStrategy.ERROR_MESSAGE.AMOUNT_MUST_BE_POSITIVE_INTEGER,
      });
  }

  /**
   *
   * @param {Validator} validator
   * @returns {Validator}
   */
  #validateParsedPurchaseAmount(validator) {
    return validator
      .validate(Number(this.#purchaseAmount))
      .with(this.#isNotZero, {
        message: PurchaseAmountValidationStrategy.ERROR_MESSAGE.AMOUNT_CAN_NOT_BE_ZERO,
      })
      .with(this.#isDivisible, {
        message:
          PurchaseAmountValidationStrategy.ERROR_MESSAGE.AMOUNT_MUST_BE_IN_MULTIPLES_OF_DIVISOR,
      });
  }

  validate() {
    const validator = new Validator();

    this.#validatePurchaseAmount(validator);
    this.#validateParsedPurchaseAmount(validator);
  }
}

export default PurchaseAmountValidationStrategy;