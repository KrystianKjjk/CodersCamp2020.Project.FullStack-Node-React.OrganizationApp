import { CourseListElementModel } from "../components/CourseList/CourseListSlice";

export function setActiveCourse(course:CourseListElementModel){
localStorage.setItem("activeCourse", JSON.stringify(course));
}

export function getActiveCourse(): CourseListElementModel | undefined{
const activeCourseItem = localStorage.getItem("activeCourse");
if(!activeCourseItem){
    return undefined;
}
return JSON.parse(activeCourseItem);
}

