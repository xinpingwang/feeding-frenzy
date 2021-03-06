import * as $ from 'jquery';

import Dot from './dot';
import { offscreen } from './utilities/utility-functions';
import TextAnimation from './animation/text-animation';
import Player from './player/player';
import Game from './game';

export default class Survival {
  dots: Dot[];
  maxDots: number;
  level: number;
  scale: number;
  currentCombo: number;

  /* initiate all defaults for a survival mode */
  constructor(private player: Player, private game: Game) {
    this.level = 1;
    this.scale = 1;
    this.currentCombo = 0;
    /* survival game mode stuff*/
    this.maxDots = 50;
    this.dots = [];
    for (let i = 0; i < this.maxDots; i++) {
      this.dots.push(
        new Dot(
          this.randomX(),
          this.randomY(),
          this.randomRadius(),
          0,
          2 * Math.PI
        )
      );
    }
  }

  /* generate a radius from 0 to twice player's radius */
  randomRadius() {
    const { player } = this;
    const { floor, random } = Math;
    const maxSize = player ? player.radius * 2 : 50;
    return floor(random() * maxSize);
  }

  /* generate Y coordinate from 0 to canvas height */
  randomY() {
    const { floor, random } = Math;
    const { height } = this.game.canvas;
    return floor(random() * height);
  }

  /* generate X coordinate from 0 to canvas width */
  randomX() {
    const { floor, random } = Math;
    const { width } = this.game.canvas;
    return floor(random() * width);
  }

  play() {
    console.log(this);
    const { ctx, canvas } = this.game;
    const { dots, scale, player } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((dot) => dot.draw(ctx, scale));
    this.game.animationManager.draw(ctx);
    player.draw(ctx, scale);
    ctx.fillStyle = 'yellow';
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${player.radius}`, 100, 50);
    ctx.fillText(`Coins: ${this.game.inventoryManager.coins}`, 100, 80);
    ctx.font = '100px Indie Flower, cursive';
    ctx.fillText(
      `Level: ${this.level}`,
      document.body.clientWidth,
      document.body.clientHeight * 2 - 100
    );
    this.physics();
    if (this.level * 30 + 30 < this.player.radius * this.scale) {
      this.scale /= 2;
      this.level++;
    }
  }

  distance(dot: Dot) {
    const { player } = this;
    const { sqrt } = Math;
    const a = player.x - dot.x;
    const b = player.y - dot.y;

    return sqrt(a * a + b * b);
  }

  physics() {
    const { player } = this;
    this.dots.forEach((dot) => {
      if (
        this.distance(dot) <=
        player.radius * this.scale + dot.radius * this.scale
      ) {
        if (player.radius > dot.radius) {
          player.radius += 1;
          this.game.inventoryManager.push({ name: dot.element, quantity: 1 });
          if (this.game.animationManager.animations.length > 0) {
            this.currentCombo += 1;
            this.game.inventoryManager.addCoins(1 * this.currentCombo);
            this.game.animationManager.push(
              new TextAnimation(
                1000,
                player.x,
                player.y,
                `Combo: +${this.currentCombo} Coins and ${dot.element}`
              )
            );
          } else {
            this.currentCombo = 1;
            this.game.inventoryManager.addCoins(1);
            this.game.animationManager.push(
              new TextAnimation(
                1000,
                player.x,
                player.y,
                `+1 Coins and ${dot.element}`
              )
            );
          }
          dot.destroy = true;
        } else {
          this.game.state = 'gameover';
          if (this.game.username && this.game._id) {
            $.post(
              `${window.location.origin}/dots/highscore`,
              {
                username: this.game.username,
                playerId: this.game._id,
                score: this.player.radius,
              },
              (data) => {
                console.log(data, 'posted high score');
              }
            );
            const { username, _id } = this.game;
            const { coins, playerInventory } = this.game.inventoryManager;
            $.post(
              `${window.location.origin}/dots/player`,
              { username, _id, coins, playerInventory },
              (data) => {
                console.log(data, 'player inventory');
              }
            );
          }
        }
      }
      if (offscreen(dot)) {
        dot.destroy = true;
      }
    });
    this.dots = this.dots.filter((dot) => !dot.destroy);
    if (this.dots.length < this.maxDots) {
      this.dots.push(
        new Dot(
          this.randomX(),
          this.randomY(),
          this.randomRadius(),
          0,
          2 * Math.PI
        )
      );
    }
    this.dots.forEach((dot) => dot.move(this.game.delta));
  }
}
