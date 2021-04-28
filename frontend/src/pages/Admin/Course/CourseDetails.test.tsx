import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import CourseDetails, { CourseProps } from "./CourseDetails";
import { RouteComponentProps } from "react-router-dom";
import { EnhancedStore } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { Course } from "./CourseDetailsSlice";
import * as CourseDetailsSlice from "./CourseDetailsSlice";

const props: any = {
  history: jest.fn(),
  location: "a",
  match: { params: { id: "courseId" } },
};

const mockStore = configureStore([]);

const course: Course = {
  _id: "courseId",
  name: "courseName",
  sections: [],
  endDate: new Date(),
  startDate: new Date(),
};

const initialState = {
  courseDetails: { course },
};

describe("Course", () => {
  let store: EnhancedStore<any, any>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should not show save button in view mode", () => {
    //@ts-ignore
    jest.spyOn(CourseDetailsSlice, "fetchCourseAsync").mockReturnValue({ type: "test" });
    
    render(
      <Provider store={store}>
        <CourseDetails {...props} />
      </Provider>
    );

    expect(screen.queryByText("SAVE")).not.toBeInTheDocument();
  });

  it("should show save button in edit mode", () => {
    //@ts-ignore
    jest.spyOn(CourseDetailsSlice, "fetchCourseAsync").mockReturnValue({ type: "test" });

    render(
      <Provider store={store}>
        <CourseDetails {...props} />
      </Provider>
    );
    
     userEvent.click(screen.getByText("EDIT"));
     expect(screen.getByText("SAVE")).toBeInTheDocument();
  });
});
