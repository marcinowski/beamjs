interface Point {
  x: number;
  y: number;
}

export class SvgHandler {
  private svg: SVGElement;
  private prevPoint?: Point = undefined;

  constructor(svg: SVGElement) {
    this.svg = svg;
  }

  public transformEventCoordinates(e: MouseEvent) {
    const { left, top } = this.svg.getBoundingClientRect();
    const rawX = e.clientX - left;
    const rawY = e.clientY - top;
    const x = rawX - (rawX % 10);
    const y = rawY - (rawY % 10);
    return { x, y };
  }

  private attachElementProperties(el: Element, args: { [k: string]: string }) {
    Object.entries(args).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }

  public drawPointFromEvent(e: MouseEvent) {
    const point = this.transformEventCoordinates(e);
    return this.drawPoint(point);
  }

  public drawPoint(point: Point) {
    const circle = this.createPoint(point);
    this.svg.appendChild(circle);
  }

  public createPoint(point: Point): SVGCircleElement {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    this.attachElementProperties(circle, {
      cx: point.x.toString(),
      cy: point.y.toString(),
      r: "3"
    });
    circle.style.cursor = "pointer";
    return circle;
  }

  public drawLineFromEvent(e: MouseEvent) {
    const point = this.transformEventCoordinates(e);
    return this.drawLine(point);
  }

  public drawLine(point: Point) {
    if (!this.prevPoint) {
      this.prevPoint = point;
      return;
    }
    const line = this.createLine(this.prevPoint, point);
    const fragment = document.createDocumentFragment();
    const firstPoint = this.createPoint(this.prevPoint);
    const secondPoint = this.createPoint(point);
    fragment.appendChild(firstPoint);
    fragment.appendChild(secondPoint);
    fragment.appendChild(line);
    this.svg.appendChild(fragment);
    this.prevPoint = point;
  }

  public createLine(start: Point, end: Point): SVGLineElement {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.attachElementProperties(line, {
      x1: start.x.toString(),
      y1: start.y.toString(),
      x2: end.x.toString(),
      y2: end.y.toString(),
      stroke: "black"
    });
    return line;
  }
}

export class CanvasHandler {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private prevPoint?: Point = undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Undefined Canvas context");
    }
    this.ctx = ctx;
  }

  public transformEventCoordinates(e: MouseEvent): Point {
    const { left, top } = this.canvas.getBoundingClientRect();
    const rawX = e.clientX - left;
    const rawY = e.clientY - top;
    const x = rawX - (rawX % 10);
    const y = rawY - (rawY % 10);
    return { x, y };
  }

  public drawPoint(e: MouseEvent) {
    const point = this.transformEventCoordinates(e);
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(point.x, point.y, 1, 1);
    this.ctx.closePath();
  }

  public drawLine(e: MouseEvent) {
    const point = this.transformEventCoordinates(e);
    if (!this.prevPoint) {
      this.prevPoint = point;
      return;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevPoint.x, this.prevPoint.y);
    this.ctx.lineTo(point.x, point.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.closePath();
    this.prevPoint = point;
  }
}
