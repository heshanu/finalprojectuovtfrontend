import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",
      logout: "Logout",
      Email: "Email",
      Password: "Password",
      Confirm_Password: "Confirm Password",
      enterPassword: "Please enter your password",
      enterEmail: "Please enter your email",
            Logging_in: "Logging in...",
        Dontyouhaveanaccount: "Don't you have an account?",
        Register: "Register",
        Username: "Username",
        Alreadyhaveanaccount: "Already have an account?",
        guidebuddyExploreDestinationText:"Discover amazing destinations and share your travel stories with fellow tourist guiders",
        guidebuddyshareTravelStoryText:"Share your unique travel experiences and inspire others with your stories on GuideBuddy",
        guidebuddyPlanyourjourneyText:"Plan your journey with personalized recommendations and expert tips from our tourist guiders", 
        sidebar:{
            home: "Home",
            customerList: "Customer List",
            travelRecommendations: "Travel Recommendations",
            customerRegister: "Customer Register",
            supportBuddy: "Support Buddy",
            settings: "Settings",
        },
        travelRecommendationsbotText:"Hello! I'm your travel assistant. Where would you like to explore today?" ,
         customerRegisterbotText:"Hello! I'm your customer registration agent. I can help you register customers. How can I assist you today?",
         tripPlannerbottext:"Hello! I'm your trip planner. I can help you plan your trip and provide travel recommendations. How can I assist you today?"
    }
  },
  si: {
    translation: {
      welcome: "සාදරයෙන් පිළිගනිමු",
      login: "ඇතුල් වන්න",
      logout: "ඉවත් වන්න",
        Email: "ඊමේල්",
        Password: "මුරපදය",
        Confirm_Password: "මුරපදය තහවුරු කරන්න",
        enterPassword: "කරුණාකර ඔබේ මුරපදය ඇතුළත් කරන්න",
        enterEmail: "කරුණාකර ඔබේ ඊමේල් ඇතුළත් කරන්න",
        Logging_in: "ඇතුල් වීම...",
        Dontyouhaveanaccount: "ඔබට ගිණුමක් නැද්ද?",
        Register: "ලියාපදිංචි වන්න",
        Username: "පරිශීලක නාමය",
        Alreadyhaveanaccount: "ඔබට ගිණුමක් තිබේද?",
        guidebuddyExploreDestinationText:"අදහස් හුවමාරු කරමින් අමුතු ගමන් මඟ හොයා ගන්න සහ ඔබේ ගමන් කථා බෙදා ගන්න",
        guidebuddyshareTravelStoryText:"ඔබේ අද්විතීය ගමන් අත්දැකීම් බෙදා හදා ගන්න සහ GuideBuddy හි ඔබේ කථා සමඟ අන් අයට ආදර්ශයක් වන්න",
        guidebuddyPlanyourjourneyText:"අපගේ සංචාරක මඟ පෙන්වන්නන්ගෙන් පුද්ගලික නිර්දේශ සහ විශේෂඥ උපදෙස් සමඟ ඔබේ ගමන සැලසුම් කරන්න",
        sidebar:{
            home: "මුල් පිටුව",
            customerList: "පාරිභෝගික ලැයිස්තුව",
            travelRecommendations: "ගමන් නිර්දේශ",
            customerRegister: "පාරිභෝගික ලියාපදිංචි",
            supportBuddy: "සහාය",
            settings: "සැකසුම්",
        },
        travelRecommendationsbotText:"හෙලෝ! මම ඔබේ ගමන් සහායකයා. අද ඔබ කොහේ ගමන් කිරීමට කැමතිද?" ,
        customerRegisterbotText:"හෙලෝ! මම ඔබේ පාරිභෝගික ලියාපදිංචි නියෝජිතයා. මම ඔබට පාරිභෝගිකයින් ලියාපදිංචි කිරීමට උදව් කළ හැක. අද ඔබට කෙසේ උදව් කළ හැකිද?",
        tripPlannerbottext:"හෙලෝ! මම ඔබේ ගමන් සැලසුම්කරු. මම ඔබට ගමන සැලසුම් කිරීමට සහ ගමන් නිර්දේශ ලබා දීමට උදව් කළ හැක. අද ඔබට කෙසේ උදව් කළ හැකිද?"

    },
  },
  ta: {
    translation: {
      welcome: "வரவேற்கிறோம்",
      login: "உள்நுழை",
      logout: "வெளியேறு",
        Email: "மின்னஞ்சல்",
        Password: "கடவுச்சொல்",
        Confirm_Password: "கடவுச்சொல் உறுதிப்படுத்தவும்",
        enterPassword: "தயவுசெய்து உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
        enterEmail: "தயவுசெய்து உங்கள் மின்னஞ்சலை உள்ளிடவும்",
        Logging_in: "உள்நுழைகிறது...",
        Dontyouhaveanaccount: "உங்களிடம் கணக்கு இல்லையா?",
        Register: "பதிவு செய்யவும்",
        Username: "பயனர் பெயர்",
        Alreadyhaveanaccount: "உங்களிடம் கணக்கு இருக்கிறதா?",
        guidebuddyExploreDestinationText:"அற்புதமான இடங்களை கண்டறிந்து, பயண கதை பகிர்ந்து கொள்ளுங்கள் பயண வழிகாட்டிகளுடன்",
        guidebuddyshareTravelStoryText:"உங்கள் தனித்துவமான பயண அனுபவங்களை பகிர்ந்து கொள்ளுங்கள் மற்றும் GuideBuddy இல் உங்கள் கதைகளுடன் மற்றவர்களுக்கு ஊக்கமளியுங்கள்",
        guidebuddyPlanyourjourneyText:"தனிப்பயன் பரிந்துரைகள் மற்றும் நிபுணர் குறிப்புகளுடன் உங்கள் பயணத்தை திட்டமிடுங்கள் எங்கள் சுற்றுலா வழிகாட்டிகளிடமிருந்து",
        sidebar:{
            home: "முகப்பு",
            customerList: "வாடிக்கையாளர் பட்டியல்",
            travelRecommendations: "பயண பரிந்துரைகள்",
            customerRegister: "வாடிக்கையாளர் பதிவு",
            supportBuddy: "ஆதரவு நண்பர்",
            settings: "அமைப்புகள்",
        },
        travelRecommendationsbotText:"வணக்கம்! நான் உங்கள் பயண உதவியாளர். இன்று நீங்கள் எங்கே ஆராய விரும்புகிறீர்கள்?" ,
         customerRegisterbotText:"வணக்கம்! நான் உங்கள் வாடிக்கையாளர் பதிவு முகவர். நான் உங்களுக்கு வாடிக்கையாளர்களை பதிவு செய்ய உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
         tripPlannerbottext:"வணக்கம்! நான் உங்கள் பயண திட்டமிடுபவர். நான் உங்களுக்கு பயணத்தை திட்டமிட உதவ முடியும் மற்றும் பயண பரிந்துரைகள் வழங்க முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?"
    }
  }
};

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;