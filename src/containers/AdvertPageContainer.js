import { connect } from "react-redux";
import { getAdvert, getIsLoading, getIsDeleting } from "../store/selectors";
import { getAd, deleteAd } from "../store/actions/adverts";

import { AdvertPage } from "../components";

const mapStateToProps = (state) => {
  return {
    advert: getAdvert(state),
    isLoading: getIsLoading(state),
    isDeleting: getIsDeleting(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAd: (id) => dispatch(getAd(id)),
    deleteAd: (id) => dispatch(deleteAd(id)),
  };
};

const AdvertPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertPage);

export default AdvertPageContainer;
