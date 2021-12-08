
<template>
  <div>
    {{ $route.path }}
    Generated at 2021-12-08T05:59:01.419Z
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
