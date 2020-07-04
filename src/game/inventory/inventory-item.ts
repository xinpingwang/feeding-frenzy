import Player from '../player/player';

export default class InventoryItem {
  constructor(public name: string, public quantity: number) {}

  addTo?(quantity: number) {
    this.quantity += quantity;
  }

  getAsItemSchema?() {
    const { quantity, name } = this;
    return { quantity, name };
  }

  saveToPlayer?(player: Player) {
    player.inventory.push(this.getAsItemSchema());
  }
}
