import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
//Guideline sizes are based on the designs for iPhone X screen mobile device
//iPhone X Resolution: 375 x 812 dp.
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const scale = size => (width / guidelineBaseWidth) * size;
// const verticalScale = size => (height / guidelineBaseHeight) * size;
const verticalScale = scale;
const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;
export { scale, verticalScale, moderateScale };
