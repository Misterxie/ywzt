<style lang="less">
.welcome {
  height: 100%;
  /*background-image: url('../images/welcome-bg.jpg');*/
    background-image: url('../styles/login_bg.jpg');
  background-size: 100% 100%;
  text-align: center;
  color: white;
  h1 {
    padding-top: 30vh;
    font-size: 5rem;
    letter-spacing: 12px;
  }
  h2 {
    font-size: 56px;
    letter-spacing: 4px;
  }
  a {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 18px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    color: white;
  }
}
</style>

<template>
  <div class="welcome">
     <h1>欢迎使用比翼平台模板工程</h1>
     <h2>CODE&DESIGNER</h2>
     <a href="#" @click.prevent="startUsing">开始使用 >></a>
  </div>
</template>

<script>
    import Cookies from "js-cookie";
export default {
  name: 'welcome',
  methods: {
    startUsing () {
        console.log(Cookies.get('user'))
      this.$router.push('/home')
    }
  }
};
</script>
