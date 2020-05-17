<template>
  <v-app>
    <v-content>
      <div class="ma-4 buttons">
        <add-button />
        <generate-button class="ml-4"/>
      </div>

      <div ref="canvasWrapp" class="canvas" @mousemove="mouseMove"  @mouseup="mouseUp">
        <class
          v-for="(obj, index) in objects"
          :key="index" :obj="obj"
          :mouse="mouse"
          :class="activeObject == obj ? 'draggable' : ''"
        />
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AddButton from "@/components/Buttons/AddButton";
import GenerateButton from "@/components/Buttons/GenerateButton";
import Class from "@/components/Class";

export default {
  name: 'App',
  data: () => ({
    mouse: {
      x: 0,
      y: 0,
      shiftX: 0,
      shiftY: 0
    },
    ctx: null,
    canvasWidth: 500,
    canvasHeight: 500,
  }),
  computed: {
    objects() {
      return this.$store.state.objects;
    },
    activeObject() {
      return this.$store.state.activeObject;
    }
  },
  mounted() {
    this.canvasWidth = this.$refs.canvasWrapp.clientWidth;
    this.canvasHeight = this.$refs.canvasWrapp.clientHeight;
    
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    this.ctx.lineWidth = 1;

    setInterval(this.drawLines, 5);
  },
  methods: {
    mouseMove(e) {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.$store.commit("changeCoordinates", this.mouse);
    },
    mouseUp() {
      this.mouse.shiftX = 0;
      this.mouse.shiftY = 0;
      this.$store.commit("removeActiveObject");
    },
    drawLines() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.beginPath();
      this.objects.forEach(obj => {
        obj.fields.forEach(v => {
          if (v.type >= 1000) {
            const finalObj = this.objects.find(o => o.id == v.type);
            let startPosiotion = {}, finalPosition = {}
            if (obj.position.x < finalObj.position.x) {
              startPosiotion = {
                x1: obj.position.x + 250,
                y1: obj.position.y + 20,
                x2: obj.position.x + 265,
                y2: obj.position.y + 20,
              };
              finalPosition = {
                x1: finalObj.position.x - 15,
                y1: finalObj.position.y + 20,
                x2: finalObj.position.x,
                y2: finalObj.position.y + 20,
              };
            } else {
              startPosiotion = {
                x1: obj.position.x,
                y1: obj.position.y + 20,
                x2: obj.position.x - 15,
                y2: obj.position.y + 20,
              };
              finalPosition = {
                x1: finalObj.position.x + 265,
                y1: finalObj.position.y + 20,
                x2: finalObj.position.x + 250,
                y2: finalObj.position.y + 20,
              };
            }

            this.ctx.moveTo(startPosiotion.x1, startPosiotion.y1);
            this.ctx.lineTo(startPosiotion.x2, startPosiotion.y2);
            this.ctx.lineTo(finalPosition.x1, finalPosition.y1);
            this.ctx.lineTo(finalPosition.x2, finalPosition.y2);
            
          }
        });

      });
      this.ctx.stroke();
    }
  },
  components: {
    "add-button": AddButton,
    "generate-button": GenerateButton,
    "class": Class
  }
};
</script>

<style lang="scss">
.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently */
}
.buttons {
  position: relative;
  z-index: 2;
}
.canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>