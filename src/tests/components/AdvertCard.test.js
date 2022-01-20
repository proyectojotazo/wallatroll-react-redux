import { render, fireEvent, screen } from "@testing-library/react";

import renderer from "react-test-renderer";
import AdvertCard from "./../../components/AdvertsPage/AdvertCard";

describe("<AdvertCard />", () => {
  const advert = {
    id: "1",
    createdAt: "12/12/2020",
    name: "Piano",
    photo: "/photo.jpg",
    sale: true,
    price: 120,
    tags: ["tag"],
  };
  const history = { push: jest.fn("param") };

  test("should match snapshot", () => {
    const tree = renderer
      .create(<AdvertCard ad={advert} history={history} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should call history.push", () => {
    render(<AdvertCard ad={advert} history={history} />);
    const redirectButton = screen.getByRole("button");
    fireEvent.click(redirectButton);
    expect(history.push).toHaveBeenCalled();
  });
});
