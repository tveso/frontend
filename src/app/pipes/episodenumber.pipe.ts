import { Pipe, PipeTransform } from '@angular/core';
import {Episode} from '../entities/episode';
import {getNumPad} from '../components/models/tvshowepisode/tvshowepisode.component';

@Pipe({
  name: 'episodenumber'
})
export class EpisodenumberPipe implements PipeTransform {

  transform(episode: Episode, args?: any): any {
      return `${episode.season_number}x${getNumPad(episode.episode_number)}`;
  }

}
