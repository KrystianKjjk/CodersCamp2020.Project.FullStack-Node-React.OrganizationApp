import * as express from "express";
import CourseService from "../Services/CourseService";

export default class CourseController {
  service: CourseService;
  constructor(service: CourseService) {
    this.service = service;
  }


  
//   getHelloWorld = async (
//     req: express.Request,
//     res: express.Response,
//     next?: express.NextFunction
// ) => {
//     const hello = await this.service.getHello();
//     res.status(200).json({ msg: `${hello} World` });
// };

getCourses = async (
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => {
  const courses = await this.service.getCourses();
  res.status(200).json({courses});
};

createCourse = async (
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => {
  console.log(req.body);
  const course = req.body;
  res.status(201).json({course});
};

// getHelloWorldParam = (
//     req: express.Request,
//     res: express.Response,
//     next?: express.NextFunction
// ) => {
//     console.log(req.params);
//     const world = req.params.world;
//     res.status(200).json({ msg: `Hello ${world}` });
// }
getCourseById = async(
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => {
  // console.log(req.params.id);
  const course = await this.service.getCourseById(req.params.id);
  console.log(course);
  res.status(200).json({course});
}

updateCourse = async(
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => {
  // console.log(req.params.id);
  const course = await this.service.updateCourse(req.body);
  console.log(course);
  res.status(201).json({course});
}

}




