import myJsonp from "@/my-jsonp";
import {MovieIns, Item, Rating} from "@/interfaces";
import {apiHost} from "@/configs";

const uri = 'subject_collection/';

class MovieServe {
  getMovieIns(params = { start:0, count: 8 }): Promise<MovieIns> {
    return myJsonp(`${apiHost}${uri}movie_showing/items`, 'jsonp1', {
      callback: 'jsonp1',
      _: 1556846500024,
      ...params
    }).then(res => {
      return this.generate(res);
    });
  }

  getMovieFree(params = { start:0, count: 8 }): Promise<MovieIns> {
    return myJsonp(`${apiHost}${uri}movie_free_stream/items`, 'jsonp2', {
      callback: 'jsonp2',
      _: 1556857861588,
      ...params
    }).then(res => {
      return this.generate(res);
    });
  }

  getMovieLastest(params = { start:0, count: 8 }): Promise<MovieIns> {
    return myJsonp(`${apiHost}${uri}movie_latest/items`, 'jsonp3', {
      callback: 'jsonp3',
      _: 1556857861589,
      ...params
    }).then(res => {
      return this.generate(res);
    });
  }


  private generate(res): MovieIns {
    return {
      name: res.subject_collection.name,
      movies: res.subject_collection_items.map(item => {
        return {
          id: item.id,
          title: item.title,
          rating: (item.rating && item.rating.value) || 0,
          coverImg: item.cover.url
        }
      }),
      total: res.total
    }
  }
}


export default new MovieServe();