import * as dotenv from "dotenv";

import { Rest } from './rest';

(async () => {
  dotenv.config();
  new Rest();
})();