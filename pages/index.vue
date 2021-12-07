<template>
  <div>
    {{ $route.path }}
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
