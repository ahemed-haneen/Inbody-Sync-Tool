let url_data_mapper = {
  user_id: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx",
  height: "1740",
  age: "26",
  time_stamp: {
    year: "2024",
    month: "11",
    date: "29",
    hour: "11",
    minutes: "19",
  },
  weight: "741",
  skeletal_muscle_mass: "332",
  body_fat_mass: "154",
  BMI: "245",
  percent_body_fat: "208",
  score: "77",
  body_composition_analysis: {
    total_body_water: "430",
    protein: "116",
    mineral: "411",
    fat_free_mass: "587",
  },
  segmental_lean_analysis: {
    trunk: "267",
    left_arm: "339",
    right_arm: "338",
    left_leg: "863",
    right_leg: "855",
  },
  segmental_fat_analysis: {
    trunk: "084",
    left_arm: "008",
    right_arm: "008",
    left_leg: "021",
    right_leg: "021",
  },
  segmental_lean_percentage: {
    right_arm: '1035',
    left_arm: '1038',
    trunk: '1025',
    right_leg: '0943',
    left_leg: '0951'
  },
  segmental_fat_percentage: {
    right_arm: '1330',
    left_arm : '1348',
    trunk: '2003',
    right_leg: '1224',
    left_leg: '1220'
  },
  waist_hip_ratio: "093",
  target_weight: "690",
  weight_control: "-0051",
  fat_control: "-0051",
  muscle_control: "!000",
  BMR: "1637",
  SMI: "79",
  visceral_fat_level: "7"
};
url_data_static_values = {
  total_body_water: {
    min: "374",
    max: "458",
  },
  protein: {
    min: "101",
    max: "123",
  },
  minerals: {
    min: "346",
    max: "423",
  },
  body_fat_mass: {
    min: "080",
    max: "160",
  },
  weight: {
    min: "566",
    max: "766",
  },
};

let url_string = `https://qrcode.inbody.com/?IBData=${url_data_mapper.user_id}!!!!!!!!!!!!!!!!!!${url_data_mapper.height}0${url_data_mapper.age}0M${url_data_mapper.time_stamp.year}${url_data_mapper.time_stamp.month}${url_data_mapper.time_stamp.date}${url_data_mapper.time_stamp.hour}${url_data_mapper.time_stamp.minutes}050${url_data_mapper.body_composition_analysis.protein}0${url_data_static_values.protein.min}0${url_data_static_values.protein.max}0${url_data_mapper.body_composition_analysis.mineral}0${url_data_static_values.minerals.min}0${url_data_static_values.minerals.max}0${url_data_mapper.body_fat_mass}0${url_data_static_values.body_fat_mass.min}0${url_data_static_values.body_fat_mass.max}0${url_data_mapper.body_composition_analysis.total_body_water}0${url_data_static_values.total_body_water.min}0${url_data_static_values.total_body_water.max}0${url_data_mapper.body_composition_analysis.fat_free_mass}0${url_data_mapper.weight}0${url_data_static_values.weight.min}0${url_data_static_values.weight.max}11130${url_data_mapper.skeletal_muscle_mass}10510${url_data_mapper.body_fat_mass}30${url_data_mapper.BMI}0${url_data_mapper.percent_body_fat}0${url_data_mapper.score}0${url_data_mapper.target_weight}${url_data_mapper.weight_control}${url_data_mapper.fat_control}${url_data_mapper.muscle_control}0${url_data_mapper.BMR}0${url_data_mapper.waist_hip_ratio}008000900${url_data_mapper.visceral_fat_level}920771112765000000000000000000003092306902282908282627542759019225362482PASS00112003850100041603160666000002200150008511112000111111121100910270-2DM-0422!!!!018502500300010002000${url_data_mapper.segmental_lean_analysis.right_arm}0${url_data_mapper.segmental_lean_analysis.left_arm}0${url_data_mapper.segmental_lean_analysis.trunk}0${url_data_mapper.segmental_lean_analysis.right_leg}0${url_data_mapper.segmental_lean_analysis.left_leg}0${url_data_mapper.segmental_fat_analysis.right_arm}0${url_data_mapper.segmental_fat_analysis.left_arm}0${url_data_mapper.segmental_fat_analysis.trunk}0${url_data_mapper.segmental_fat_analysis.right_leg}0${url_data_mapper.segmental_fat_analysis.left_leg}${url_data_mapper.segmental_lean_percentage.right_arm}${url_data_mapper.segmental_lean_percentage.left_arm}${url_data_mapper.segmental_lean_percentage.trunk}${url_data_mapper.segmental_lean_percentage.right_leg}${url_data_mapper.segmental_lean_percentage.left_leg}0${url_data_mapper.segmental_fat_percentage.right_arm}0${url_data_mapper.segmental_fat_percentage.left_arm}0${url_data_mapper.segmental_fat_percentage.trunk}0${url_data_mapper.segmental_fat_percentage.right_leg}0${url_data_mapper.segmental_fat_percentage.left_leg}00${url_data_mapper.SMI}02`;

console.log('url new value: ', url_string)
