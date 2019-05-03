<template>
    <div class="wrap">
        <div class="pic">
            <img :src="item.coverImg" />
        </div>
        <span class="van-ellipsis">{{item.title}}</span>
        <div class="rating" v-if="item.rating">
            <van-rate :value="item.rating" :size="12" />
            <span>{{item.rating}}</span>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Item } from '../interfaces';
  @Component({
    name: 'MovieItem'
  })
  export default class MovieItem extends Vue {
      @Prop() readonly item!: Item;
  }
</script>

<style lang="less" scoped>
    .wrap{
        text-align: center;
        span{
            display: block;
            font-size: .14rem;
        }
        .rating{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                font-size: .12rem;
            }
        }
    }
</style>
