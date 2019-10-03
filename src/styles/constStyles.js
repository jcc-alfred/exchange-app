import { Dimensions, Platform } from "react-native";

const width = Dimensions.get( 'window' ).width;
const height = Dimensions.get( 'window' ).height;

const constStyles = {
    THEME_COLOR: "#0f2649",

    TAB_BAR_ICON_SIZE: Platform.OS === 'ios' ? 34 : 28,

    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,

    tabIconDefault: '#ccc',

    dividerColor: '#ABB3BA',

    tipTitleColor: '#87949E'
};
export default constStyles;

