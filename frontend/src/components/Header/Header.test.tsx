import React from "react";
import Header from "./index";
import { render} from "@testing-library/react";
import * as Hooks from "../../app/hooks";
import { CourseListElementModel } from "../../pages/Admin/CourseList/CourseListSlice";

const courseListElement: CourseListElementModel = {
  _id: "dummyId",
  name: "dummyName",
  description: "dummyDescription",
  endDate: new Date(),
  startDate: new Date(),
};

describe("Header", () => {
  it("should render header", () => {
    jest.spyOn(Hooks,"useAppSelector").mockReturnValue({activeCourse:courseListElement})
   const {container}= render(<Header />);
    expect(container).toMatchSnapshot()
  });
});
