<template>
  <v-app>
    <v-content>
      <div class="ma-4 buttons">
        <add-button />
        <generate-button class="ml-4"/>
      </div>

      <div class="canvas" @mousemove="mouseMove"  @mouseup="mouseUp">
        <class
          v-for="(obj, index) in objects"
          :key="index" :obj="obj"
          :mouse="mouse"
          :class="activeObject == obj ? 'draggable' : ''"
        />
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
    obj: {
      name: "ship",
      fields: [
        { name: "number", type: 1 },
        { name: "count", type: 2 },
        { name: "membership", type: 3 }
      ]
    },
    mouse: {
      x: 0,
      y: 0,
      shiftX: 0,
      shiftY: 0
    }
  }),
  computed: {
    objects() {
      return this.$store.state.objects;
    },
    activeObject() {
      return this.$store.state.activeObject;
    }
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