<template>
  <div class="d-flex flex-column grey lighten-2 class" color="grey darken-1">
    <div class="class-title text-truncate text-center">{{ obj.name }}</div>
    <div class="class-field text-truncate text-center" v-for="(field, index) in obj.fields" :key="index">
      {{ `${field.name}: ${types.find(v => v.id == field.type).name}` }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Class",
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  computed: {
    types() {
      return this.$store.state.types.concat(this.$store.state.objects);
    }
  }
}
</script>

<style lang="scss">
.class {
  width: 250px;
  border-radius: 5px;

  &-title {
    width: 100%;
    color: rgba(0,0,0,0.87);
    padding: 7px 10px;
    font-size: 18px;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transition: .3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: #F5F5F5;
      cursor: pointer;
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