import * as express from 'express';
import * as mongoose from 'mongoose';

class App {
  public app: express.Application;
  public router: express.Router;
  private port: string;

  constructor(
      mongoUrl: string,
      middlewares: any[],
      router: express.Router,
      port: string,
      errorMiddleware: any
  ) {
      this.app = express();
      this.router = router;
      this.port = port;
      this.connectToTheDatabase(mongoUrl);
      this.initializeMiddlewares(middlewares);
      this.initializeRouter();
      this.initializeErrorMiddlewares(errorMiddleware);
      return this;
  }

  public listen() {
      this.app.listen(this.port, () => {
          console.log(`App listening on the port ${this.port}`);
      });
  }

  private connectToTheDatabase(mongoUrl: string) {
      mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`App connected to MongoDB Atlas`);
  }

  private initializeMiddlewares(middlewares: any[]) {
      middlewares.forEach((middleware) => {
          this.app.use(middleware);
      });
  }
  private initializeRouter() {
      this.app.use("/api", this.router);
  }
  private initializeErrorMiddlewares(middlewares: any) {
      this.app.use(middlewares.notFoundError);
      this.app.use(middlewares.serverError);

  }
}

export default App;
