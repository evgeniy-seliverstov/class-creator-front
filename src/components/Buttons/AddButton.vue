<template>
  <div class="d-inline">
    <v-btn dark @click.prevent="openDialog">
      <v-icon size="20" class="mr-2">mdi-plus-circle-outline</v-icon>
      Добавить класс
    </v-btn>
    
    
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="pb-3">
        <v-card-title class="headline justify-center">Добавление класса</v-card-title>
        <v-divider></v-divider>
        
        <v-card-text class="pt-5">
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="addClass">
            <v-text-field
              v-model="name"
              :rules="nameClassRules"
              :label="`Название класса`"
              required
              clearable
            ></v-text-field>

            <div v-for="(field, index) in fields" :key="index" class="d-flex justify-space-between">
              <v-text-field
                v-model="field.name"
                :rules="nameFieldRules"
                label="Название поля"
                required
                :style="{ maxWidth: fields.length != 1 ? '45%' : '48%' }"
              ></v-text-field> 
              <v-select
                v-model="field.type"
                :items="types"
                :rules="fieldTypeRules"
                item-text="name"
                item-value="id"
                label="Тип поля"
                :style="{ maxWidth: fields.length != 1 ? '45%' : '48%' }"
              ></v-select>         
              <v-icon v-if="fields.length != 1" size="24" color="red darken-2" @click="removeField(index)">mdi-close-circle-outline</v-icon>
            </div>
            <v-btn class="d-block" style="width: 100%" outlined color="grey darken-1" @click="addField">Добавить поле</v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn :disabled="!valid" color="success" class="px-5" @click.prevent="addClass" >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const validName = require("@/filters/filters").validName;

export default {
  name: "AddButton",
  data(){
    return {
      dialog: false,
      valid: true,
      name: "",
      nameClassRules: [
        v => !!v || "Обязательное поле",
        v => v.length > 3 || "Длина имени должна быть больше 3",
        v => validName.test(v) || "Может содержать только латинские буквы, цифры и '_'. Начинается с буквы.",
        v => !this.names.includes(v) || "Данное имя уже занято",
      ],
      nameFieldRules: [
        v => !!v || "Обязательное поле",
        v => v.length > 3 || "Длина имени должна быть больше 3",
        v => validName.test(v) || "Может содержать только латинские буквы, цифры и '_'. Начинается с буквы.",
        v => this.fields.filter(el => el.name == v).length == 1 || "Поля в классе должны быть уникальными"
      ],
      fieldTypeRules: [
        v => !!v || "Обязательное поле",
      ],
      fields: [{ name: "", type: null }]
    }
  },
  computed: {
    types() {
      return this.$store.state.types.concat(this.$store.state.objects);
    },
    names() {
      const names = [];
      this.$store.state.objects.map(v => {names.push(v.name)});
      return names;
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.valid = true;
      this.nameClass = "";
    },
    addField() {
      this.fields.push({ name: "", type: null });
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    addClass() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        let obj = {
          name: this.name,
          fields: this.fields
        }
        this.$store.commit("addObject", obj);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-icon::after {
  content: none !important;
}
</style>