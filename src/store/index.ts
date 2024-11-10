import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./modules/alertModule";
import loginReducer from "./modules/loginModule";
import loadingReducer from "./modules/loadingModule";
import routeReducer from "./modules/routeModule";

export default configureStore({
  reducer: {
    alert: alertReducer,
    loading: loadingReducer,
    login: loginReducer,
    route: routeReducer,
  },
});
