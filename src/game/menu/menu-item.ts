export default class MenuItem {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    public text: string
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    const { text, x, y, width, height } = this;
    ctx.fillText(`${text}`, x + width / 2, y + height / 2);
  }

  collide(checkX: number, checkY: number) {
    const { x, y, width, height } = this;
    return (
      checkX > x && checkX < x + width && checkY > y && checkY < y + height
    );
  }
}
