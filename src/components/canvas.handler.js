export class SvgHandler {
    constructor(svg) {
        this.prevPoint = undefined;
        this.svg = svg;
    }
    transformEventCoordinates(e) {
        const { left, top } = this.svg.getBoundingClientRect();
        const rawX = e.clientX - left;
        const rawY = e.clientY - top;
        const x = rawX - (rawX % 10);
        const y = rawY - (rawY % 10);
        return { x, y };
    }
    attachElementProperties(el, args) {
        Object.entries(args).forEach(([key, value]) => el.setAttribute(key, value));
        return el;
    }
    drawPointFromEvent(e) {
        const point = this.transformEventCoordinates(e);
        return this.drawPoint(point);
    }
    drawPoint(point) {
        const circle = this.createPoint(point);
        this.svg.appendChild(circle);
    }
    createPoint(point) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.attachElementProperties(circle, {
            cx: point.x.toString(),
            cy: point.y.toString(),
            r: "3"
        });
        circle.style.cursor = "pointer";
        return circle;
    }
    drawLineFromEvent(e) {
        const point = this.transformEventCoordinates(e);
        return this.drawLine(point);
    }
    drawLine(point) {
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
    createLine(start, end) {
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
    constructor(canvas) {
        this.prevPoint = undefined;
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Undefined Canvas context");
        }
        this.ctx = ctx;
    }
    transformEventCoordinates(e) {
        const { left, top } = this.canvas.getBoundingClientRect();
        const rawX = e.clientX - left;
        const rawY = e.clientY - top;
        const x = rawX - (rawX % 10);
        const y = rawY - (rawY % 10);
        return { x, y };
    }
    drawPoint(e) {
        const point = this.transformEventCoordinates(e);
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(point.x, point.y, 1, 1);
        this.ctx.closePath();
    }
    drawLine(e) {
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
