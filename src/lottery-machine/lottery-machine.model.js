// @ts-check
class LotteryMachineModel {
  /** @type {number} */
  #purchaseAmount;

  /** @type {Array<number>} */
  #winningNumbers;

  /** @type {number} */
  #bonusNumber;

  /**
   *
   * @param {number} purchaseAmount
   */
  setPurchaseAmount(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  /**
   *
   * @returns {Array<number>}
   */
  getWinningNumbers() {
    return this.#winningNumbers;
  }

  /**
   *
   * @param {Array<number>} winningNumbers
   */
  setWinningNumbers(winningNumbers) {
    this.#winningNumbers = winningNumbers;
  }

  /**
   *
   * @param {number} bonusNumber
   */
  setBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }
}

export default LotteryMachineModel;
