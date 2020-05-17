<template>
  <div class="d-inline delete-button" @click="deleteClass">
    <v-icon size="20" color="grey darken-3">mdi-delete</v-icon>
  </div>
</template>

<script>
export default {
  name: "DeleteButton",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    deleteClass() {
      this.$store.commit("deleteObject", this.id);
    }
  }
}
</script>

<style lang="scss">
.delete-button {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 10px;
  top: 7px;
  border: 1px solid rgba(0,0,0,0);
  transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 100%;
  
  &:hover {
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.5);
    background: rgba(0,0,0,0.05);
  }

  i {
    position: absolute;
    left: 50%;
    margin-left: -10px;
    top: 1px;
  }
}
</style>