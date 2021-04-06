import { CourseListElementModel } from "../components/CourseList/CourseListSlice";

export function setActiveCourse(course:CourseListElementModel){
localStorage.setItem("activeCourse", JSON.stringify(course));
}

export function getActiveCourse(): CourseListElementModel | null{
const activeCourseItem = localStorage.getItem("activeCourse");
if(!activeCourseItem){
    return null;
}
return JSON.parse(activeCourseItem);
}

