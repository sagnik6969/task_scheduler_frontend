<template>
  <v-tooltip text="Tooltip" location="bottom">
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="w-fit">
        <slot></slot>
      </div>
    </template>
  </v-tooltip>
</template>
