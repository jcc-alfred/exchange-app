import userReducer from "./user/userReducer";
import settingReducer from "./setting/settingReducer";
import navReducer from "./nav/navReducer";
import metaReducer from "./meta/metaReducer";


export const reducers = {
    nav: navReducer,
    userStore: userReducer,
    settingStore: settingReducer,
    metaStore: metaReducer
};
