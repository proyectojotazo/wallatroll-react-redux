import { Range, getTrackBackground } from "react-range";

export const RangePrice = ({price, maxPrice, handlePrice}) => {
  const STEP = 1
  const MIN = 0
  
  return (
    <Range
      values={price}
      step={STEP}
      min={MIN}
      max={maxPrice}
      onChange={handlePrice}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "90%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "2px",
              background: getTrackBackground({
                values: price,
                colors: ["#ccc", "#548BF4", "#ccc"],
                min: MIN,
                max: maxPrice,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ index, props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "22px",
            width: "22px",
            borderRadius: "24px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #AAA",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-28px",
              color: "#999",
              fontWeight: "bold",
              fontSize: "14px",
              fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            {`${price[index]}€`}
          </div>
          <div
            style={{
              height: "6px",
              width: "5px",
              backgroundColor: isDragged ? "#548BF4" : "#CCC",
            }}
          />
        </div>
      )}
    />
  );
};

export default RangePrice