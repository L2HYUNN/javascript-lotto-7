// @ts-check
import LotteryMachineView from './lottery-machine.view.js';
import LotteryMachineService from './lottery-machine.service.js';

class LotteryMachineController {
  /** @type {LotteryMachineView} */
  #lotteryMachineView;

  /** @type {LotteryMachineService} */
  #lotteryMachineService;

  constructor({ views, services }) {
    const { LotteryMachineView: lotteryMachineView } = views;
    const { LotteryMachineService: lotteryMachineService } = services;

    this.#lotteryMachineView = lotteryMachineView;
    this.#lotteryMachineService = lotteryMachineService;
  }

  async init() {
    const purchaseAmount = await this.#lotteryMachineView.getLotteryPurchaseAmount();
    this.#lotteryMachineService.inputPurchaseAmount(purchaseAmount);
  }
}

export default LotteryMachineController;