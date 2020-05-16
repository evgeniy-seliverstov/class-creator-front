<template>
  <v-app>
    <v-content>
      <div class="ma-4">
        <add-button />
        <generate-button class="ml-4"/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AddButton from "@/components/Buttons/AddButton";
import GenerateButton from "@/components/Buttons/GenerateButton";

export default {
  name: 'App',
  data: () => ({
  }),
  components: {
    "add-button": AddButton,
    "generate-button": GenerateButton
  }
};
</script>