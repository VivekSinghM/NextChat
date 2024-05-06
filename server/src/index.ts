require("dotenv").config();
import "reflect-metadata";

import {
  createExpressServer,
  RoutingControllersOptions,
} from "routing-controllers";

const runtime_args = require("minimist")(process.argv.slice(2));

const port = runtime_args["port"] || process.env.APP_PORT || 8000;

const routingControllerOptions: RoutingControllersOptions = {
  routePrefix: "v1",
  controllers: [`${__dirname}/modules/http/*.controller.*`],
  validation: true,
  classTransformer: true,
  cors: true,
  defaultErrorHandler: true,
};

const app = createExpressServer(routingControllerOptions);

app.get('/',(req, res)=>{
    res.send('')
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
