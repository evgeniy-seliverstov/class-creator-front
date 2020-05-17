<template>
  <div class="d-inline-block flex-column grey lighten-2 class" color="grey darken-1" :style="`left: ${obj.position.x}px; top: ${obj.position.y}px;`">
    <div class="class-title text-truncate text-center unselectable" style="padding: 7px 70px;" @mousedown="mouseDown">
      {{ obj.name }}
    </div>
    <div class="fields">
      <div class="class-field text-truncate text-center unselectable" v-for="(field, index) in obj.fields" :key="index">
        {{ `${field.name}: ${types.find(v => v.id == field.type).name}` }}
      </div>
    </div>
    <edit-button :obj="obj" />
    <delete-button :id="obj.id" />
  </div>
</template>

<script>
import EditButton from "@/components/Buttons/EditButton";
import DeleteButton from "@/components/Buttons/DeleteButton";

export default {
  name: "Class",
  props: {
    obj: {
      type: Object,
      required: true
    },
    mouse: {
      type: Object,
      required: true
    }
  },
  computed: {
    types() {
      return this.$store.state.types.concat(this.$store.state.objects);
    }
  },
  methods: {
    mouseDown(e) {
      this.mouse.shiftX = e.clientX - this.$el.getBoundingClientRect().left;
      this.mouse.shiftY = e.clientY - this.$el.getBoundingClientRect().top;
      this.$store.commit("setActiveObject", this.obj.id);
    }
  },
  components: {
    "edit-button": EditButton,
    "delete-button": DeleteButton
  }
}
</script>

<style lang="scss">
.class {
  position: absolute;
  width: 250px;
  border-radius: 5px;
  border: 1px solid;
  box-shadow: 0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12);

  &-title {
    width: 100%;
    color: rgba(0,0,0,0.87);
    padding: 7px 10px;
    font-size: 18px;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: grab;
  }

  &.draggable {
    z-index: 1000;
    transform: scale(1.03);
    box-shadow: 0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12);

    .class-title {
      cursor: grabbing;
    }
  }

  &-field {
    width: 100%;
    color: rgba(0,0,0,0.87);
    background: #fff;
    padding: 5px 10px;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0,0,0,0.15);
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>