const faqsList = [
  {
    q: "How does the food image analysis work?",
    a: "The app uses AI-powered image recognition technology to analyze the uploaded food images. Our system attempts to identify the food items in the image and estimate their calorie and nutrient content. However, the accuracy may vary depending on factors like image quality, lighting, and the complexity of the dish.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes, we prioritize user data privacy. Your personal information is securely stored and encrypted. We do not share your data with third parties without your explicit consent.",
  },
  {
    q: "What if I have a dietary restriction not listed in the app?",
    a: "You can typically add specific dietary restrictions or allergies in your user profile. If your needs are unique or complex, we recommend consulting with a registered dietitian or nutritionist.",
  },
  {
    q: "How accurate are the calorie and nutrient estimates?",
    a: "The accuracy of the estimates can vary depending on factors like image quality, lighting, and the complexity of the dish. It's always best to use these estimates as a general guideline and not as the sole source of nutritional information.",
  },
  {
    q: "Can I track my exercise activities in the app?",
    a: "Yes, you can typically log your exercise activities within the app, such as the type of exercise, duration, and intensity. This helps you get a more complete picture of your overall health and fitness.",
  },
  {
    q: "How can I contact support if I have any issues or questions?",
    a: "You can typically find contact information for support within the app itself (e.g., in the settings menu). Alternatively, you can check the app's website or social media pages for contact details.",
  },
  {
    q: "Is this app intended for medical advice?",
    a: "No, this app is not a substitute for professional medical or dietary advice. The information provided is for general informational purposes only.",
  },
];

const testimonialsData = [
  {
    avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
    name: "John Doe",
    title: "Software Engineer",
    quote:
      "This app has been a game-changer for me! It's easy to use, and the food image analysis is surprisingly accurate. I've already started seeing improvements in my diet.",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    name: "Jane Smith",
    title: "Fitness Instructor",
    quote:
      "I recommend this app to all my clients. It helps them track their progress effectively and provides valuable insights into their dietary habits.",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    name: "David Lee",
    title: "Student",
    quote:
      "The app is user-friendly and makes it fun to track my food intake. The reminders are helpful, and I'm learning so much about my eating habits.",
  },
];

// https://img.freepik.com/free-photo/flat-lay-sport-frame-with-salad_23-2148531521.jpg?t=st=1740028737~exp=1740032337~hmac=5727ae7710374ea406715fe7967e308bd0e13c21f7c5e0fd9a4e12b3dff9ae79&w=1480
// img.freepik.com/free-photo/flat-lay-sport-frame-with-salad_23-2148531521.jpg
// https://media.istockphoto.com/id/2151795188/photo/empty-white-watercolor-paper-canvas-texture-background.jpg?s=612x612&w=0&k=20&c=CioDGl3RuTBFgEdJk3l92RCPYvOoLbhB32DsRyhF378=
// https://img.freepik.com/free-photo/delicious-healthy-lettuce-salad_23-2148173973.jpg
// https://img.freepik.com/free-photo/colorful-cornflakes-concept-tasty-breakfast-morning-food-space-text_185193-165889.jpg?semt=ais_hybrid
// https://t4.ftcdn.net/jpg/01/46/91/15/360_F_146911524_hiyuWatjjoO3scF3sBOvAl8aKO3qPadw.jpg

const countries = [
  { value: "afghanistan", label: "Afghanistan" },
  { value: "argentina", label: "Argentina" },
  { value: "australia", label: "Australia" },
  { value: "brazil", label: "Brazil" },
  { value: "canada", label: "Canada" },
  { value: "china", label: "China" },
  { value: "egypt", label: "Egypt" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "india", label: "India" },
  { value: "indonesia", label: "Indonesia" },
  { value: "iran", label: "Iran" },
  { value: "italy", label: "Italy" },
  { value: "japan", label: "Japan" },
  { value: "mexico", label: "Mexico" },
  { value: "netherlands", label: "Netherlands" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "nigeria", label: "Nigeria" },
  { value: "pakistan", label: "Pakistan" }, // 🇵🇰 Included Pakistan
  { value: "philippines", label: "Philippines" },
  { value: "russia", label: "Russia" },
  { value: "saudi-arabia", label: "Saudi Arabia" },
  { value: "south-africa", label: "South Africa" },
  { value: "south-korea", label: "South Korea" },
  { value: "spain", label: "Spain" },
  { value: "sweden", label: "Sweden" },
  { value: "switzerland", label: "Switzerland" },
  { value: "turkey", label: "Turkey" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
  { value: "vietnam", label: "Vietnam" },
];

const interestsList = [
  "Technology",
  "Sports",
  "Music",
  "Art",
  "Food",
  "Travel",
  "Fitness",
  "Gaming",
  "Fashion",
  "Photography",
  "Reading",
  "Movies",
  "Science",
  "History",
  "Business",
  "Programming",
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const allergyEnums = [
  "Dairy",
  "Eggs",
  "Wheat",
  "Soy",
  "Tree Nuts",
  "Peanuts",
  "Shellfish",
  "Fish",
  "Gluten",
  "Lactose",
  "Other",
];

const dietaryPrefEnums = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Keto",
  "Intermittent Fasting",
  "Low-Carb",
  "High-Protein",
  "Gluten-Free",
  "Lactose-Free",
  "Other",
];

const weightGoalsEnums = ["Lose Fat", "Maintain", "Build Muscle"];

const activityLevelEnums = [
  "Sedentary",
  "Light",
  "Moderate",
  "Heavy",
  "Extreme",
];

export {
  interestsList,
  testimonialsData,
  faqsList,
  countries,
  genderOptions,
  weightGoalsEnums,
  activityLevelEnums,
  dietaryPrefEnums,
  allergyEnums,
};
