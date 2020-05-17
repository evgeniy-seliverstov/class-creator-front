<template>
  <v-app>
    <v-content>
      <div class="ma-4">
        <add-button />
        <generate-button class="ml-4"/>
      </div>

      <class :obj="obj" class="ml-10"/>
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
    }
  }),
  components: {
    "add-button": AddButton,
    "generate-button": GenerateButton,
    "class": Class
  }
};
</script>