import { CanvasHandler, SvgHandler } from "./canvas.handler";

const methodsMixin = {
  data: () => {
    return {
      methods: [
        {
          icon: "scatter_plot",
          title: "Points",
          id: 1
        },
        {
          icon: "show_chart",
          title: "Line",
          id: 2
        }
      ]
    };
  },
  methods: {
    addEventListener(name, f, prop) {
      this.svg.addEventListener(name, f, prop);
      if (this.events == null) {
        this.events = [];
      }
      this.events.push({ name, f, prop });
    },
    clearEventListeners() {
      this.events.forEach(i =>
        this.svg.removeEventListener(i.name, i.f, i.prop)
      );
      this.events = [];
    },
    handleLines: function() {
      const draw = new SvgHandler(this.svg);
      this.addEventListener(
        "click",
        function(e) {
          draw.drawLineFromEvent(e);
        },
        false
      );
    },
    handlePoints: function() {
      const draw = new SvgHandler(this.svg);

      this.addEventListener(
        "click",
        function(e) {
          draw.drawPointFromEvent(e);
        },
        false
      );
    },
    handleMethod: function(method) {
      this.clearEventListeners();
      switch (method) {
        case 1: {
          console.log("Points");
          this.handlePoints();
          break;
        }
        case 2: {
          console.log("Drawing");
          this.handleLines();
          break;
        }
      }
    }
  }
};

export default methodsMixin;
