<template>
  <div class="d-flex align-items-center gap-1em">
    <h1 class="fs-1em m-0">
      <NuxtLink to="/">{{ $config.title }}</NuxtLink>
    </h1>

    <a
      :href="`https://github.com/oshinko/nuxt2-static/tree/main/assets/pages${$route.path}`"
      class="fs-_75em"
    >
      この記事のソースコード
    </a>

    <Octcat />
  </div>
</template>

<style scoped>
a {
  color: #333;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
