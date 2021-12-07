import fs from 'fs'

fs.writeFileSync('./pages/index.vue', `
<template>
  <div>
    {{ $route.path }}
    Generated at ${(new Date()).toISOString()}
    <ul>
      <li><NuxtLink to="page1">page1</NuxtLink></li>
      <li><NuxtLink to="page2">page2</NuxtLink></li>
      <li><NuxtLink to="page2/page3">page3</NuxtLink></li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>
`)
