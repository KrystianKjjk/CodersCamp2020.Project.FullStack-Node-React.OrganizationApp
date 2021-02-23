import * as express from "express";
import CourseService from "../Services/CourseService";

export default class CourseController {
  service: CourseService;
  constructor(service: CourseService) {
    this.service = service;
  }

  getHelloWorld = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
) => {
    const hello = await this.service.getHello();
    res.status(200).json({ msg: `${hello} World` });
};
getHelloWorldParam = (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
) => {
    console.log(req.params);
    const world = req.params.world;
    res.status(200).json({ msg: `Hello ${world}` });
}
postHelloWorldParam = (
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => {
  console.log(req.params);
  const world = req.params.world;
  res.status(201).json({ msg: `Hello ${world}` });
} 

}
