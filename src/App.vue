<script setup></script>

<template>
  <nav class="main-nav">
    <div class="nav-brand">ShirtOFF Exchange</div>
    <div class="nav-links">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">Информация</RouterLink>
    </div>
  </nav>

  <RouterView />
</template>

<style>
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 64px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  font-family: "Inter", sans-serif;
}

.nav-brand {
  font-weight: 700;
  font-size: 20px;
  color: var(--text);
  letter-spacing: -0.5px;
}

.nav-brand span {
  color: var(--blue);
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-links a {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.15s ease;
}

.nav-links a:hover {
  color: var(--text);
  background: var(--surface-hover);
}

.nav-links a.router-link-active {
  color: var(--text);
  background: rgba(91, 124, 255, 0.12);
  box-shadow: inset 0 0 0 1px rgba(91, 124, 255, 0.25);
}

@media (max-width: 700px) {
  .main-nav {
    padding: 0 16px;
    flex-wrap: wrap;
    height: auto;
    min-height: 56px;
    gap: 6px;
  }

  .nav-brand {
    font-size: 17px;
  }

  .nav-links {
    gap: 4px;
    flex-wrap: wrap;
  }

  .nav-links a {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 400px) {
  .nav-links a {
    font-size: 12px;
    padding: 4px 10px;
  }
}
</style>
