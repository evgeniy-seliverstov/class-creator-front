<template>
  <div class="d-inline">
    <div class="d-inline edit-button" @click="openDialog">
      <v-icon size="20" color="grey darken-3">mdi-pencil</v-icon>
    </div>

    <v-dialog v-model="dialog" max-width="400">
      <v-card class="pb-3">
        <v-card-title class="headline justify-center">Изменение класса</v-card-title>
        <v-divider></v-divider>
        
        <v-card-text class="pt-5">
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="changeClass">
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
          <v-btn :disabled="!valid" color="success" class="px-5" @click.prevent="changeClass" >
            Изменить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const validName = require("@/filters/filters").validName;

export default {
  name: "EditButton",
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data() {
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
      return this.$store.state.types.concat(this.$store.state.objects).filter(v => v.id != this.obj.id);
    },
    names() {
      const names = [];
      this.$store.state.objects.map(v => {names.push(v.name)});
      return names.filter(v => v != this.obj.name);
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.name = this.obj.name;
      this.fields = JSON.parse(JSON.stringify(this.obj.fields));
    },
    addField() {
      this.fields.push({ name: "", type: null });
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    changeClass() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        let obj = {
          id: this.obj.id,
          name: this.name,
          fields: this.fields
        }
        this.$store.commit("changeObject", obj);
      }
    }
  }
}
</script>

<style>
.edit-button {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 10px;
  border: 1px solid rgba(0,0,0,0);
  transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 100%;
}
.edit-button:hover {
  border: 1px solid rgba(0,0,0,0.5);
  background: rgba(0,0,0,0.05);
}
</style>