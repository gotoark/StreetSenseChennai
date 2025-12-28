"use strict";
// Core enums for the Chennai Street Food Assistant
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherCondition = exports.ChennaiArea = exports.MoodType = void 0;
var MoodType;
(function (MoodType) {
    MoodType["RAINY_EVENING"] = "rainy_evening";
    MoodType["HUNGRY_HEAVY"] = "hungry_heavy";
    MoodType["LIGHT_SNACK"] = "light_snack";
    MoodType["STRESS_RELIEF"] = "stress_relief";
    MoodType["MIDNIGHT_HUNGER"] = "midnight_hunger";
})(MoodType || (exports.MoodType = MoodType = {}));
var ChennaiArea;
(function (ChennaiArea) {
    ChennaiArea["T_NAGAR"] = "t_nagar";
    ChennaiArea["ANNA_NAGAR"] = "anna_nagar";
    ChennaiArea["MYLAPORE"] = "mylapore";
    ChennaiArea["TRIPLICANE"] = "triplicane";
    ChennaiArea["VELACHERY"] = "velachery";
    ChennaiArea["TAMBARAM"] = "tambaram";
    ChennaiArea["OMR"] = "omr";
    ChennaiArea["PARRYS_CORNER"] = "parrys_corner";
})(ChennaiArea || (exports.ChennaiArea = ChennaiArea = {}));
var WeatherCondition;
(function (WeatherCondition) {
    WeatherCondition["SUNNY"] = "sunny";
    WeatherCondition["RAINY"] = "rainy";
    WeatherCondition["CLOUDY"] = "cloudy";
    WeatherCondition["MONSOON"] = "monsoon";
})(WeatherCondition || (exports.WeatherCondition = WeatherCondition = {}));
//# sourceMappingURL=index.js.map