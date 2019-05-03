import myJsonp from "@/my-jsonp";
import {MovieShowing, Item, Rating} from "@/interfaces";
import {apiHost} from "@/configs";

const uri = 'subject_collection/';

class MovieServe {
  getMovieShowing(params = { start:0, count: 8 }): Promise<MovieShowing> {
    return myJsonp(`${apiHost}${uri}movie_showing/items`, 'jsonp1', {
      callback: 'jsonp1',
      _: 1556846500024,
      ...params
    }).then(res => {
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
    });
  }
}


export default new MovieServe();