import TextAnimation from './text-animation';

export default class AnimationManager {
  animations: TextAnimation[];

  constructor() {
    this.animations = [];
  }

  push(animation: TextAnimation) {
    this.animations.push(animation);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.animations.forEach((animation) => animation.draw(ctx));
    this.animations = this.animations.filter((animation) => !animation.destroy);
  }
}
