import React from "react";
import Header from "./index";
import { render} from "@testing-library/react";

describe("Header", () => {
  it("should render header", () => {
   const {container}= render(<Header />);
    expect(container).toMatchSnapshot()
  });
});
