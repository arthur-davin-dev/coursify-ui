import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Digital Library": "Digital Library",
      "Search & review": "Search & review",
      your: "your",
      "favorite book": "favorite book",
      HeroDescription:
        "Embark on a literary journey like never before. Discover, explore, and review thousands of books in one seamless experience.",
      "Explore Books": "Explore Books",
      "About us": "About us",
      Books: "Books",
      Readers: "Readers",
      Course: "Course",
      Library: "Library",
      Profile: "Profile",
      "Sign Out": "Sign Out",
      Trending: "Trending",
      Design: "Design",
      Science: "Science",
      Tech: "Tech",
      Business: "Business",
      "All-In-One": "All-In-One",
      Platform: "Platform",
      FeaturesDescription:
        "Coursify is a powerful online learning suite that combines all the tools students need to excel in Design, Technology, and Business.",

      // Card 1
      Personalized: "Personalized",
      Mentoring: "Mentoring",
      MentoringDetail:
        "Get one-on-one or group sessions with industry experts, tailored to your pace and style for better learning retention.",

      // Card 2
      "Step-by-Step": "Step-by-Step",
      Mastery: "Mastery",
      MasteryDetail:
        "Practice complex concepts with guided explanations. Break down professional challenges into clear, actionable steps.",

      // Card 3
      Interactive: "Interactive",
      Exercises: "Exercises",
      ExercisesDetail:
        "Boost learning with hands-on activities, quizzes, and virtual labs. Our interactive tools make learning effective and fun.",
      "What can we do with": "What can we do with",
      "The Best of Both Worlds": "The Best of Both Worlds",
      Classroom: "Classroom",
      Engagement: "Engagement",
      Online: "Online",
      Flexibility: "Flexibility",
      HowItWorksDescription:
        "Experience the connection of a physical classroom with the personalized pacing of advanced e-learning. Coursify combines expert mentors, dynamic content, and interactive practical labs—all within one secure, scalable cloud ecosystem.",
      "Learn more about our platform": "Learn more about our platform",
      "What Our ": "What Our ",
      "Students Say": "Students Say",
      "Project Manager": "Project Manager",
      "Web Developer": "Web Developer",
      "UX/UI Designer": "UX/UI Designer",
      Feedback1:
        "Coursify completely changed how I learn. The project-based approach helped me build a portfolio that got me hired within three months!",
      Feedback2:
        "The coding labs are incredibly smooth. Coursify's interactive environment made complex backend logic click for me.",
      Feedback3:
        "As a designer, I appreciate the beauty of the platform. The UI/UX courses are top-notch, taught by industry experts.",
      "Frequently Asked Questions": "Frequently Asked Questions",
      FAQ_Q1: "What is the Coursify platform?",
      FAQ_A1:
        "Coursify is a comprehensive online learning ecosystem designed to bridge the gap between theoretical knowledge and practical skills in Design, Technology, and Business.",
      FAQ_Q2: "What resources are available for students?",
      FAQ_A2:
        "Students get access to video lessons, interactive labs, project files, and a dedicated community. Premium members receive 1-on-1 mentoring.",
      FAQ_Q3: "Who can use the platform?",
      FAQ_A3:
        "Coursify is open to all learners—from beginners starting a new career to professionals wanting to upskill at any age.",
      FAQ_Q4: "How does the mentoring system work?",
      FAQ_A4:
        "Our system pairs you with industry experts for direct feedback via live video calls or asynchronous project reviews.",
      // about us page
      "Empowering Next Gen": "Empowering the Next Generation of Cambodian Developers.",
"About Description": "Bridging the gap between traditional education and industry demands through a centralized digital ecosystem for specialized IT learning.",
"Our Vision": "Our Vision",
"Digital Hub": "A Digital Hub for Continuous Growth",
"Vision Detail": "Coursify was born from a simple observation: students in Cambodia need a unified platform where resources are accessible, structured, and modern. We’ve built a dual-purpose environment that serves as both a comprehensive digital library and an interactive classroom.",
"High Performance": "High Performance",
"HP Detail": "Built with Next.js for lightning-fast speeds and SEO optimization.",
"Expert Led": "Expert-Led",
"EL Detail": "Curriculum designed by experienced mentors and industry professionals.",
"Curated Courses": "Curated Courses",
"Active Students": "Active Students",
"Tech Workshops": "Tech Workshops",
"Our Mission in Action": "Our Mission in Action",
"Mission Detail": "We don't just provide content; we provide a roadmap for Cambodian students to master the latest technologies and secure their future in the global tech market.",
"Community Driven": "Community Driven Learning",
"Localized Support": "Localized Support",
"Our Mentors": "Our Mentors",
"Mentor Detail": "Guided by industry leaders who inspire excellence and innovation.",
"Our Members": "Our Members",
"Member Detail": "The passionate people driving Coursify forward.",
"Questions": "Have questions about Coursify?",
"Join Community": "We are always looking for collaborators, students, and mentors to join our growing tech community.",
"Get In Touch": "Get In Touch",
"Leader": "Leader",
"Sub Leader": "Sub Leader",
"Member": "Member",
"Project Advisor": "Project Advisor",
"Mentor": "Mentor",
    },
  },
  kh: {
    translation: {
      "Digital Library": "បណ្ណាល័យឌីជីថល",
      "Search & review": "ស្វែងរក & ពិនិត្យ",
      your: "នៃ",
      "favorite book": "សៀវភៅដែលអ្នកចូលចិត្ត",
      HeroDescription:
        "ចាប់ផ្តើមការធ្វើដំណើរផ្នែកអក្សរសាស្ត្រដែលមិនធ្លាប់មានពីមុនមក។ ស្វែងរក រុករក និងពិនិត្យមើលសៀវភៅរាប់ពាន់ក្បាលក្នុងបទពិសោធន៍ដ៏រលូនតែមួយ។",
      "Explore Books": "រុករកសៀវភៅ",
      "About us": "អំពីយើង",
      Books: "សៀវភៅ",
      Readers: "អ្នកអាន",
      Course: "វគ្គសិក្សា",
      Library: "បណ្ណាល័យ",
      Profile: "ប្រវត្តិរូប",
      "Sign Out": "ចាកចេញ",
      Trending: "កំពុងពេញនិយម",
      Design: "រចនា",
      Science: "វិទ្យាសាស្ត្រ",
      Tech: "បច្ចេកវិទ្យា",
      Business: "អាជីវកម្ម",
      "Join 50,000+ students learning today":
        "ចូលរួមជាមួយសិស្សជាង ៥០,០០០+ នាក់ដែលកំពុងសិក្សានៅថ្ងៃនេះ",
      "Master the": "ស្ទាត់ជំនាញលើ",
      Skills: "ជំនាញ",
      "To Build Your": "ដើម្បីកសាង",
      "Dream Career": "អាជីពក្នុងសុបិនរបស់អ្នក",
      Her0Description:
        "ចូលទៅកាន់វគ្គសិក្សាដែលមានចំណាត់ថ្នាក់ខ្ពស់ជាង ៥,០០០+ ពីអ្នកជំនាញក្នុងឧស្សាហកម្ម។ ចាប់ពីការរចនា UI/UX រហូតដល់ការអភិវឌ្ឍន៍ Full-stack យើងផ្តល់ឧបករណ៍ដើម្បីប្រែក្លាយការចង់ដឹងរបស់អ្នកទៅជាអាជីព។",
      "Browse Courses": "រកមើលវគ្គសិក្សា",
      "View Free Demo": "មើលការបង្ហាញឥតគិតថ្លៃ",
      "Expert Mentors": "គ្រូបង្វឹកជំនាញ",
      "Lifetime Access": "ចូលរៀនបានមួយជីវិត",
      Certifications: "វិញ្ញាបនបត្រ",
      "Video Lessons": "មេរៀនវីដេអូ",
      "Course Rating": "ការវាយតម្លៃវគ្គសិក្សា",
      "All-In-One": "កម្មវិធីសិក្សា",
      Platform: "ពេញលេញបំផុត",
      FeaturesDescription:
        "Coursify គឺជាឈុតសិក្សាតាមអ៊ីនធឺណិតដ៏មានឥទ្ធិពលដែលរួមបញ្ចូលគ្នានូវឧបករណ៍ទាំងអស់ដែលសិស្សត្រូវការ ដើម្បីពូកែខាងរចនា បច្ចេកវិទ្យា និងអាជីវកម្ម។",
      "Personalized Mentoring": "ការប្រឹក្សាយោបល់ <br /> ផ្ទាល់ខ្លួន",
      MentoringDetail:
        "ទទួលបានវគ្គសិក្សាមួយទល់នឹងមួយ ឬជាក្រុមជាមួយអ្នកជំនាញក្នុងឧស្សាហកម្ម ដែលតម្រូវតាមល្បឿន និងស្ទីលរបស់អ្នក ដើម្បីការចងចាំកាន់តែប្រសើរ។",
      "Step-by-Step Mastery": "ការស្ទាត់ជំនាញ <br /> ជាជំហានៗ",
      MasteryDetail:
        "អនុវត្តគោលគំនិតស្មុគ្រស្មាញជាមួយការពន្យល់ណែនាំ។ បំបែកបញ្ហាប្រឈមវិជ្ជាជីវៈទៅជាជំហានច្បាស់លាស់ និងអាចអនុវត្តបាន។",
      "Interactive Exercises": "លំហាត់ <br /> អន្តរកម្ម",
      ExercisesDetail:
        "បង្កើនការសិក្សាជាមួយនឹងសកម្មភាពអនុវត្តផ្ទាល់ កម្រងសំណួរ និងបន្ទប់ពិសោធន៍និម្មិត។ ឧបករណ៍អន្តរកម្មរបស់យើងធ្វើឱ្យការសិក្សាមានប្រសិទ្ធភាព និងរីករាយ។",
      Personalized: "ការប្រឹក្សាយោបល់",
      Mentoring: "ផ្ទាល់ខ្លួន",

      "Step-by-Step": "ការស្ទាត់ជំនាញ",
      Mastery: "ជាជំហានៗ",

      Interactive: "លំហាត់",
      Exercises: "អន្តរកម្ម",
      "What can we do with": "តើយើងអាចធ្វើអ្វីបានខ្លះជាមួយ",
      "The Best of Both Worlds": "អ្វីដែលល្អបំផុតទាំងពីរយ៉ាង",
      Classroom: "ថ្នាក់រៀន",
      Engagement: "ការចូលរួម",
      Online: "អនឡាញ",
      Flexibility: "ភាពបត់បែន",
      HowItWorksDescription:
        "ទទួលបានបទពិសោធន៍នៃការតភ្ជាប់នៃថ្នាក់រៀនផ្ទាល់ ជាមួយនឹងល្បឿនសិក្សាផ្ទាល់ខ្លួននៃការរៀនតាមអេឡិចត្រូនិកកម្រិតខ្ពស់។ Coursify រួមបញ្ចូលគ្រូបង្វឹកជំនាញ មាតិកាឌីណាមិក និងមន្ទីរពិសោធន៍អនុវត្តអន្តរកម្ម—ទាំងអស់នៅក្នុងប្រព័ន្ធអេកូឡូស៊ីក្លោដដែលមានសុវត្ថិភាព និងអាចពង្រីកបាន។",
      "Learn more about our platform": "ស្វែងយល់បន្ថែមអំពីកម្មវិធីរបស់យើង",
      "What Our ": "មតិយោបល់របស់",
      "Students Say": "សិស្សរបស់យើង",
      "Project Manager": "អ្នកគ្រប់គ្រងគម្រោង",
      "Web Developer": "អ្នកអភិវឌ្ឍន៍គេហទំព័រ",
      "UX/UI Designer": "អ្នករចនា UX/UI",
      Feedback1:
        "Coursify បានផ្លាស់ប្តូររបៀបដែលខ្ញុំរៀនទាំងស្រុង។ ការសិក្សាតាមបែបគម្រោងបានជួយខ្ញុំបង្កើត Portfolio ដែលធ្វើឱ្យខ្ញុំទទួលបានការងារក្នុងរយៈពេលត្រឹមតែបីខែ!",
      Feedback2:
        "បន្ទប់ពិសោធន៍កូដគឺរលូនខ្លាំងណាស់។ បរិយាកាសអន្តរកម្មរបស់ Coursify បានធ្វើឱ្យខ្ញុំយល់ច្បាស់អំពីតក្កវិជ្ជា backend ដ៏ស្មុគស្មាញ។",
      Feedback3:
        "ក្នុងនាមជាអ្នករចនា ខ្ញុំពេញចិត្តនឹងភាពស្រស់ស្អាតនៃកម្មវិធីនេះ។ វគ្គសិក្សា UI/UX គឺពិតជាល្អឥតខ្ចោះ និងបង្រៀនដោយអ្នកជំនាញក្នុងវិស័យនេះផ្ទាល់។",
      "Frequently Asked Questions": "សំណួរដែលសួរញឹកញាប់",
      FAQ_Q1: "តើអ្វីទៅជាកម្មវិធី Coursify?",
      FAQ_A1:
        "Coursify គឺជាប្រព័ន្ធអេកូឡូស៊ីសិក្សាតាមអ៊ីនធឺណិតដ៏ទូលំទូលាយដែលត្រូវបានរចនាឡើងដើម្បីផ្សារភ្ជាប់គម្លាតរវាងចំណេះដឹងទ្រឹស្តី និងជំនាញអនុវត្តជាក់ស្តែងក្នុងផ្នែករចនា បច្ចេកវិទ្យា និងអាជីវកម្ម។",
      FAQ_Q2: "តើសិស្សអាចទទួលបានធនធានអ្វីខ្លះ?",
      FAQ_A2:
        "សិស្សទទួលបានសិទ្ធិចូលរៀនមេរៀនវីដេអូ បន្ទប់ពិសោធន៍អន្តរកម្ម ឯកសារគម្រោង និងសហគមន៍សិក្សា។ សមាជិក Premium នឹងទទួលបានការប្រឹក្សាផ្ទាល់ជាមួយគ្រូជំនាញ។",
      FAQ_Q3: "តើនរណាខ្លះអាចប្រើប្រាស់កម្មវិធីនេះបាន?",
      FAQ_A3:
        "Coursify បើកចំហសម្រាប់អ្នកសិក្សានៅគ្រប់កម្រិត—ចាប់ពីអ្នកចាប់ផ្តើមដំបូងរហូតដល់អ្នកជំនាញដែលចង់បង្កើនជំនាញបន្ថែម ដោយមិនគិតពីអាយុ។",
      FAQ_Q4: "តើប្រព័ន្ធប្រឹក្សាយោបល់ (Mentoring) ដំណើរការយ៉ាងដូចម្តេច?",
      FAQ_A4:
        "ប្រព័ន្ធរបស់យើងនឹងភ្ជាប់អ្នកជាមួយអ្នកជំនាញក្នុងឧស្សាហកម្មដើម្បីទទួលបានមតិកែលម្អផ្ទាល់ តាមរយៈការហៅវីដេអូ ឬការពិនិត្យមើលគម្រោងការងាររបស់អ្នក។",
      // about us page
      "Empowering Next Gen": "ផ្តល់អំណាចដល់អ្នកអភិវឌ្ឍន៍ជំនាន់ក្រោយរបស់កម្ពុជា។",
"About Description": "បំពេញចន្លោះរវាងការអប់រំបែបប្រពៃណី និងតម្រូវការឧស្សាហកម្មតាមរយៈប្រព័ន្ធអេកូឡូស៊ីឌីជីថលមជ្ឈិមសម្រាប់ការសិក្សាផ្នែក IT ឯកទេស។",
"Our Vision": "ចក្ខុវិស័យរបស់យើង",
"Digital Hub": "មជ្ឈមណ្ឌលឌីជីថលសម្រាប់ការរីកចម្រើនជាបន្តបន្ទាប់",
"Vision Detail": "Coursify ត្រូវបានបង្កើតឡើងពីការសង្កេតសាមញ្ញមួយ៖ និស្សិតក្នុងប្រទេសកម្ពុជាត្រូវការវេទិកាតែមួយដែលធនធានអាចចូលប្រើបាន មានរចនាសម្ព័ន្ធ និងទំនើប។ យើងបានបង្កើតបរិយាកាសដែលមានគោលបំណងពីរដែលបម្រើទាំងជាបណ្ណាល័យឌីជីថលដ៏ទូលំទូលាយ និងជាថ្នាក់រៀនអន្តរកម្ម។",
"High Performance": "ប្រសិទ្ធភាពខ្ពស់",
"HP Detail": "បង្កើតឡើងជាមួយ Next.js សម្រាប់ល្បឿនលឿនដូចផ្លេកបន្ទោរ និងបង្កើនប្រសិទ្ធភាព SEO ។",
"Expert Led": "ដឹកនាំដោយអ្នកជំនាញ",
"EL Detail": "កម្មវិធីសិក្សារៀបចំឡើងដោយគ្រូបង្គោលដែលមានបទពិសោធន៍ និងអ្នកជំនាញក្នុងឧស្សាហកម្ម។",
"Curated Courses": "វគ្គសិក្សាដែលសម្រាំង",
"Active Students": "សិស្សសកម្ម",
"Tech Workshops": "សិក្ខាសាលាបច្ចេកវិទ្យា",
"Our Mission in Action": "បេសកកម្មរបស់យើងក្នុងសកម្មភាព",
"Mission Detail": "យើងមិនត្រឹមតែផ្តល់ខ្លឹមសារប៉ុណ្ណោះទេ យើងផ្តល់ជូននូវផែនទីបង្ហាញផ្លូវសម្រាប់សិស្សកម្ពុជាក្នុងការស្ទាត់ជំនាញបច្ចេកវិទ្យាចុងក្រោយបំផុត និងធានាអនាគតរបស់ពួកគេនៅក្នុងទីផ្សារបច្ចេកវិទ្យាសកល។",
"Community Driven": "ការសិក្សាដែលជំរុញដោយសហគមន៍",
"Localized Support": "ការគាំទ្រក្នុងស្រុក",
"Our Mentors": "គ្រូបង្វឹករបស់យើង",
"Mentor Detail": "ណែនាំដោយអ្នកដឹកនាំក្នុងឧស្សាហកម្មដែលជំរុញឧត្តមភាព និងនវានុវត្តន៍។",
"Our Members": "សមាជិករបស់យើង",
"Member Detail": "មនុស្សដែលមានចំណង់ចំណូលចិត្តជំរុញ Coursify ទៅមុខ។",
"Questions": "តើអ្នកមានសំណួរអំពី Coursify ដែរឬទេ?",
"Join Community": "យើងតែងតែស្វែងរកអ្នកសហការ សិស្ស និងគ្រូបង្គោល ដើម្បីចូលរួមក្នុងសហគមន៍បច្ចេកវិទ្យាដែលកំពុងរីកចម្រើនរបស់យើង។",
"Get In Touch": "ទាក់ទងមកយើង",
"Leader": "ប្រធានក្រុម",
"Sub Leader": "អនុប្រធានក្រុម",
"Member": "សមាជិក",
"Project Advisor": "ទីប្រឹក្សាគម្រោង",
"Mentor": "គ្រូបង្វឹក",
    },
  },
};
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
