import { connect } from "react-redux";
import { getIsLoading, getAdverts } from "./../store/selectors";
import { getAds } from "./../store/actions/adverts";

import { AdvertsPage } from "../components";

const mapStateToProps = (state) => {
  return {
    isLoading: getIsLoading(state),
    ads: getAdverts(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAds: () => dispatch(getAds()),
  };
};

const AdvertsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertsPage);

export default AdvertsPageContainer;
