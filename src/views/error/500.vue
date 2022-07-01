<script setup lang="ts">
import noServer from "@/assets/status/500.svg?component";

defineOptions({
  name: "500Page",
});
</script>

<template>
  <div class="flex justify-center items-center h-screen-sm">
    <noServer />
  </div>
</template>
