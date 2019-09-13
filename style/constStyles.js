import { Platform, StatusBar } from "react-native";
import { Header } from 'react-navigation';

const constStyles = {
    // STATE_BAR_HEIGHT: Platform.OS === 'ios' ? ( Util.isIphoneX() ? 44 : 17 ) : StatusBar.currentHeight,
    ACTION_BAR_HEIGHT: Header.HEIGHT,

    THEME_COLOR: "#00aade",
    DIVIDER_COLOR: '#e7e7e7',
    PROGRESS_COLOR: [ 'red', 'green', 'blue' ],
    DISABLED_BG_COLOR: '#B5B5B5',
    PLACE_HOLDER_TEXT_COLOR: "#B5B5B5",
    multiline: true,

    // STATE_BAR_OFFY_KEYBOARD: Platform.OS === 'ios' ? ( Util.isIphoneX() ? 44 : 0 ) : StatusBar.currentHeight,


    TITLE_FONT_SIZE: 16,
    COMMON_PADDING: 15,


    STYLES_PLACE_HOLDER_TEXT_COLOR: "#7a8a99",
    STYLES_PLACE_HOLDER_TEXT_DARK_COLOR: "#ffffffcc",
    SPINNER_COLOR: '#ffc515',
    PICKER_CANCEL_COLOR: [ 255, 197, 21, 1 ],
    PICKER_CONFIRM_COLOR: [ 255, 197, 21, 1 ],
    PICKER_CONFIRM_COLOR_CODE: "#ffc515",
    PICKER_CANCEL_COLOR_CODE: "#ffc515",
    HOME_TAB_UNDERLAY_COLOR: '#fd9603',
    STATUS_BAR_COLOR_DARK: Platform.OS === 'ios' ? "#0c6d97" : '#0c6d97',
    STATUS_BAR_COLOR_LIGHT: Platform.OS === 'ios' ? "#0c6d97" : '#0c6d97',
    STATUS_BAR_CONTENT_STYLE_DARK: Platform.OS === 'ios' ? 'dark-content' : 'light-content',
    STATUS_BAR_CONTENT_STYLE_LIGHT: Platform.OS === 'ios' ? 'light-content' : 'light-content',
    ACTION_TITLE_COLOR: '#3e3c43',
    ACTION_TITLE_SIZE: '#3e3c43',
    COMMON_GREY_BG: '#f1f3f5',
    TSI_DARK_BLUE: "#0c6d97",
    BANNER_HEIGHT: 200,

    TAB_BAR_ICON_SIZE: Platform.OS === 'ios' ? 34 : 28,
};
export default constStyles;

