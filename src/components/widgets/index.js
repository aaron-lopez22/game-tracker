// Widget registry: layout kind → component. Add new profile widgets here
// (and to DEFAULT_LAYOUT / WIDGET_INFO in src/lib/layout.js).

import TopAllTimeWidget from './TopAllTimeWidget'
import TopYearWidget from './TopYearWidget'
import NowPlayingWidget from './NowPlayingWidget'
import LinksWidget from './LinksWidget'
import RecentCompletedWidget from './RecentCompletedWidget'
import StatsWidget from './StatsWidget'
import CurrentlyPlayingWidget from './CurrentlyPlayingWidget'

export const WIDGETS = {
  top_all_time:      TopAllTimeWidget,
  top_year:          TopYearWidget,
  now_playing:       NowPlayingWidget,
  links:             LinksWidget,
  recent_completed:  RecentCompletedWidget,
  stats:             StatsWidget,
  currently_playing: CurrentlyPlayingWidget,
}
