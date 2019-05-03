<template>
  <div class="home">
    <section class="sec">
      <div class="title">
        <h2>{{movieShows.name}}</h2>
        <span>更多</span>
      </div>
      <div class="list">
        <Dbscroll :data="movieShows.movies">
          <div class="list-wrap van-clearfix">
            <MovieItem
              class="item"
              v-for="item in movieShows.movies"
              :key="item.id"
              :item="item"
            ></MovieItem>
          </div>
        </Dbscroll>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MovieServe from "../services/movie.service";
import { MovieShowing, Item } from "@/interfaces";
import { setTimeout } from "timers";
@Component({
  name: "Home"
})
export default class Home extends Vue {
  movieShows = {} as MovieShowing;
  created() {
    MovieServe.getMovieShowing().then((res: MovieShowing) => {
      this.movieShows = res;
    });
  }
}
</script>
<style scoped lang="less">
@import "~vant/lib/style/var";
.home {
  .sec {
    padding: 0.15rem;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 0.16rem;
      }
      span {
        font-size: 0.14rem;
        color: @green;
      }
    }
    .list {
      overflow-x: auto;
      white-space: nowrap;
      .list-wrap {
        width: 256%;
        .item {
          width: 30%;
          float: left;
          width: 1rem;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>
