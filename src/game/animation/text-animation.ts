export default class TextAnimation {
  start: number;
  end: number;
  destroy: boolean;

  constructor(
    life: number,
    private x: number,
    private y: number,
    private text: string
  ) {
    this.start = new Date().getTime();
    this.end = this.start + life;
    this.destroy = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { text, x, y, end } = this;
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.font = '30px Arial';
    ctx.fillText(text, x, y);
    ctx.closePath();
    this.y -= 5;
    if (end < new Date().getTime()) {
      this.destroy = true;
    }
  }
}
