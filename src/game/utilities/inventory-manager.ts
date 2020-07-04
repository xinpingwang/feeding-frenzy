import * as $ from 'jquery';

import inventoryStub from './stub-inventory';
import InventoryItem from './inventory-item';
import Game from '../game';

export default class InventoryManager {
  coins: number;
  playerInventory: InventoryItem[];
  game: Game;

  constructor(parent: Game) {
    const isDev = parent.mode === 'development';
    this.game = parent;
    this.playerInventory = isDev ? inventoryStub : [];
    this.coins = 0;
    if (!isDev) {
      this.getInventoryFromDB();
    }
  }

  getInventoryFromDB() {
    const self = this;
    const { username, _id } = this.game;

    $.post(
      `${window.location.origin}/dots/get-player`,
      { username, _id },
      (data) => {
        if (data.length === 0) {
          return false;
        }
        self.coins = parseInt(data[0].coins);

        self.playerInventory = data[0].playerInventory.map(
          (item: InventoryItem) => {
            const { name, quantity } = item;
            return { name, quantity };
          }
        );
      }
    );
  }

  updateItem(item: InventoryItem) {
    let { playerInventory } = this;
    this.playerInventory = playerInventory.map((ownedItem) =>
      item.name === ownedItem.name
        ? new InventoryItem(item.name, ownedItem.quantity + item.quantity)
        : ownedItem
    );
  }

  addCoins(quantity: number) {
    this.coins += quantity;
  }

  push(item: InventoryItem) {
    const { playerInventory } = this;
    const hasItem =
      playerInventory.filter((ownedItem) => ownedItem.name === item.name)
        .length > 0;

    if (hasItem) {
      this.updateItem(item);
    } else {
      playerInventory.push(new InventoryItem(item.name, item.quantity));
    }
  }
}
