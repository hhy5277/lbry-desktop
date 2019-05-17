import { connect } from 'react-redux';
import {
  doFetchRewardedContent,
  doRewardList,
  selectFeaturedUris,
  doFetchFeaturedUris,
  selectFetchingFeaturedUris,
} from 'lbryinc';
import { selectFollowedTags } from 'lbry-redux';
import DiscoverPage from './view';

const select = state => ({
  // featuredUris: selectFeaturedUris(state),
  // fetchingFeaturedUris: selectFetchingFeaturedUris(state),
  followedTags: selectFollowedTags(state),
});

const perform = dispatch => ({
  fetchFeaturedUris: () => dispatch(doFetchFeaturedUris()),
  fetchRewardedContent: () => dispatch(doFetchRewardedContent()),
  fetchRewards: () => dispatch(doRewardList()),
});

export default connect(
  select,
  perform
)(DiscoverPage);
