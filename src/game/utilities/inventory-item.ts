import Player from '../player';

export default class InventoryItem {
  constructor(private name: string, private quantity: string) {}

  addTo(quantity: number) {
    this.quantity += quantity;
  }

  getAsItemSchema() {
    const { quantity, name } = this;
    return { quantity, name };
  }

  saveToPlayer(player: Player) {
    player.inventory.push(this.getAsItemSchema());
  }
}
