<template>
  <div class="hot">
    <slot name="title" />
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: 'RightSlotItem'
}
</script>

<style scoped>

.hot{
  margin-bottom: 15px;
  font-size: 15px;
  background: #ffffff;
  padding:10px 20px;
}

.hot ul{
  margin:0;
  padding:0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}

.hot ul li {
  color:#7a7a7a;
  font-size: 13px;
  line-height: 1.846153846;
  font-family:"Open Sans", Helvetica, Arial, sans-serif;
}

.hot ul li a{
  text-decoration: underline;
}

.hot ul li a:hover,.hot ul li a:focus{
  color: #21759b;
}
.hot p{
  color:#636363;
}

.hot img {
  width: 225px;
}

.hot .imgContent a{
  padding:0 17px;
  font-size: 35px;
}
</style>
