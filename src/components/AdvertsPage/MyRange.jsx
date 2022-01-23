import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const MyRange = ({ ...props }) => {
  return (
    <Range name="price" min={0} className="range-custom-width" {...props} />
  );
};

export default MyRange;
