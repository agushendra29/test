<template>
  <div class="main">
    <HeaderTest :user="user"/>
    <div class="layout-wrapper">
      <aside class="sidebar">
        <ul class="menulist">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="menuItem"
            :class="{ active: index === activeIndex }"
            @click="setActive(index)"
          >
            <div class="menu-item-container" :class="{ active: index == activeIndex }">
              <div class="menu-item-text" :class="{ active: index == activeIndex }">{{ item }}</div>
            </div>
          </li>
        </ul>
      </aside>

      <main class="container-menu">
        <div class="content-card" v-if="activeIndex == 0">
          <StarsGenerator />
        </div>
        <div class="content-card" v-if="activeIndex == 1">
          <SpelledOut />
        </div>
        <div class="content-card" v-if="activeIndex == 2">
          <RegisterForm />
        </div>
      </main>
    </div>
    <FooterTest />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StarsGenerator from '../components/starsGenerator.vue'
import HeaderTest from '../components/header.vue'
import FooterTest from '../components/footer.vue'

    const menuItems = ["Get the Stars", "Spelled Out", "Form Data"];
    const activeIndex = ref(0);

    const setActive = (index:number) => {
        activeIndex.value = index;
    }


    

const user = ref(null)

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      user.value = JSON.parse(userData)
    } catch (e) {
      console.error('Failed to parse user from localStorage', e)
    }
  }
})

</script>


<style scoped>
.main {
  background: linear-gradient(to bottom right, #f8f9fc, #ffffff);
  font-family: "Montserrat", sans-serif;
  color: #2b2b2b;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-wrapper {
  display: flex;
  flex: 1;
  max-width: 1366px;
  margin: 0 auto;
  width: 100%;
  padding: 0 5.5%;
}
.sidebar {
  position: sticky;
  top: 160px; /* match your header height */
  height: fit-content;
  background-color: white;
  border-right: 1px solid #E4E7EB;
  padding: 1.5rem 0;
  width: 245px;
  border-radius: 20px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.04);
  z-index: 1;
}

.container-menu {
  flex: 1;
  padding: 140px 2rem 2rem;
}

.content-card {
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.menuItem {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 5.5%;
}

.menuItem:hover {
  background-color: #f2f4f7;
  transition: background-color 0.2s ease-in-out;
}

.menuItem.active {
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  border-left: 4px solid #4CAF50;
  font-weight: 600;
}

.menu-item-container {
  border-bottom: 1px solid #E4E7EB;
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 30px;
}

.menu-item-container.active {
  border-bottom: none;
}

.menu-item-text {
  cursor: pointer;
  color: #82888C;
  padding: 19px 10px;
  font-size: 14px;
  font-family: "Montserrat";
  width: 100%;
}

.menu-item-text.active {
  color: #121212;
  font-weight: 600;
}

</style>


