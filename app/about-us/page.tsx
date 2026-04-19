"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaGithub,
  FaTelegramPlane,
  FaEnvelope,
  FaRocket,
  FaGraduationCap,
  FaLightbulb,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";
import { Moul, Kantumruy_Pro } from "next/font/google"; // 1. Import directly

const moul = Moul({ weight: "400", subsets: ["khmer"] });
const kantumruy = Kantumruy_Pro({ weight: ["400", "700"], subsets: ["khmer"] });
const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "kh";

  // 2. Use the .className property instead of "font-moul"
  const headingFontClass = isKhmer ? moul.className : "font-sans uppercase";
  const bodyFontClass = isKhmer ? kantumruy.className : "font-sans";

  // Animation Variants (Kept from original)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const mentors = [
    {
      name: "Mom Reksmey",
      role: t("Mentor"),
      image: "/mentor/Mom Reksmey.jpg",
      links: {
        fb: "https://www.facebook.com/share/1ArWrn2KYR/?mibextid=wwXIfr",
        gh: "https://github.com/Reksmeys",
        tg: "https://t.me/reksmey_mom",
      },
    },
    {
      name: "Chan Chhaya",
      role: t("Mentor"),
      image: "/mentor/Chan Chhaya.jpg",
      links: {
        fb: "https://www.facebook.com/share/1DMUCAWYV4/?mibextid=wwXIfr",
        gh: "https://github.com/it-chhaya",
        tg: "https://t.me/chhayadevkh",
      },
    },
    {
      name: "Kit Tara",
      role: t("Project Advisor"),
      image: "/mentor/Kit Tara.jpg",
      links: {
        fb: "https://www.facebook.com/share/1CRKbQHyYg/?mibextid=wwXIfr",
        gh: "https://github.com/tarakit",
        tg: "https://t.me/tarakit",
      },
    },
  ];

  const team = [
    {
      name: "Chhay Davin",
      role: t("Leader"),
      image: "/member/Chhay Davin.jpg",
      links: {
        fb: "https://www.facebook.com/share/1AwPvLhm4U/?mibextid=wwXIfr",
        gh: "https://github.com/Arthurdavin",
        tg: "https://t.me/ArthurDavin1215",
      },
    },
    {
      name: "Pech PhakLey",
      role: t("Sub Leader"),
      image: "/member/Pech Phakley.jpg",
      links: {
        fb: "https://www.facebook.com/phak.ley",
        gh: "https://github.com/pechphakley",
        tg: "https://t.me/phakley",
      },
    },
    {
      name: "Som Borey",
      role: t("Member"),
      image: "/member/Som Borey.jpg",
      links: { fb: "https://www.facebook.com/share/18ZnGmrDB2/?mibextid=wwXIfr", gh: "https://github.com/borey172006", tg: "https://t.me/SumBorey" },
    },
    {
      name: "Hourt LeangHom",
      role: t("Member"),
      image: "/member/Hourt LeangHom.jpg",
      links: { fb: "https://www.facebook.com/share/1DDyQMzeZq/?mibextid=wwXIfr", gh: "https://github.com/Bobz4693/Hayto", tg: "https://t.me/H_Bobz" },
    },
  ];

  const stats = [
    { icon: <FaBookOpen />, label: t("Curated Courses"), value: "50+" },
    { icon: <FaUsers />, label: t("Active Students"), value: "1,200+" },
    { icon: <FaLightbulb />, label: t("Tech Workshops"), value: "24" },
  ];

  return (
    <div
      className={`${bodyFontClass} bg-white dark:bg-[#020617] text-gray-900 dark:text-white transition-colors duration-300 min-h-screen selection:bg-cyan-500/30 overflow-x-hidden`}
    >
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/student/team1.JPG"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.4] dark:brightness-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 dark:via-[#020617]/50 to-gray-100 dark:to-[#020617]"></div>
        </motion.div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`text-6xl md:text-8xl font-black mb-6 tracking-tighter italic ${isKhmer ? "text-5xl md:text-7xl" : ""}`}
          >
            COURSIFY
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl md:text-4xl text-cyan-600 dark:text-cyan-400 font-medium mb-8 ${headingFontClass}`}
          >
            {t("Empowering Next Gen")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t("About Description")}
          </motion.p>
        </div>
      </section>

      {/* Project Concept Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <div>
              <h2
                className={`text-cyan-600 dark:text-cyan-500 font-bold tracking-widest uppercase text-sm mb-2 ${isKhmer ? "font-bold" : ""}`}
              >
                {t("Our Vision")}
              </h2>
              <h3
                className={`text-3xl md:text-4xl font-bold mb-4 italic ${headingFontClass}`}
              >
                {t("Digital Hub")}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("Vision Detail")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-cyan-500/50 transition-colors group">
                <FaRocket className="text-cyan-600 dark:text-cyan-500 text-3xl mb-4 group-hover:scale-110 transition-transform" />
                <h4
                  className={`font-bold text-xl mb-2 ${isKhmer ? "font-bold" : ""}`}
                >
                  {t("High Performance")}
                </h4>
                <p className="text-sm text-gray-500">{t("HP Detail")}</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-cyan-500/50 transition-colors group">
                <FaGraduationCap className="text-cyan-600 dark:text-cyan-500 text-3xl mb-4 group-hover:scale-110 transition-transform" />
                <h4
                  className={`font-bold text-xl mb-2 ${isKhmer ? "font-bold" : ""}`}
                >
                  {t("Expert Led")}
                </h4>
                <p className="text-sm text-gray-500">{t("EL Detail")}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-3xl blur opacity-10 dark:opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-[#020617] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
              <img
                src="https://thumbs.dreamstime.com/b/our-vision-background-light-bulb-words-drawn-blackboard-chalkboard-business-concept-40008857.jpg"
                alt="Vision"
                className="w-full h-full object-cover opacity-90 dark:opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gray-50 dark:bg-[#03081c]/30">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center p-8 bg-white dark:bg-gray-900/40 rounded-3xl border border-gray-100 dark:border-gray-800"
              >
                <div className="text-4xl text-cyan-500 mb-4">{stat.icon}</div>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div
                  className={`text-gray-500 uppercase tracking-widest text-xs font-bold ${isKhmer ? "font-bold" : ""}`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className={`text-4xl font-bold mb-6 italic ${headingFontClass}`}
          >
            {t("Our Mission in Action")}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-gray-600 dark:text-gray-400"
          >
            {t("Mission Detail")}
          </motion.p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden relative group h-80"
          >
            <img
              src="/mentor/Support learning.jpg"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Learning"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-8">
              <h4
                className={`text-2xl font-bold text-white ${headingFontClass}`}
              >
                {t("Community Driven")}
              </h4>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden relative group h-80"
          >
            <img
              src="/mentor/Driven Learning.jpg"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Team"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-8">
              <h4
                className={`text-2xl font-bold text-white ${headingFontClass}`}
              >
                {t("Localized Support")}
              </h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#03081c]/50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2
              className={`text-5xl md:text-6xl font-bold mb-6 ${headingFontClass}`}
            >
              {t("Our")}{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                {t("Mentors")}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t("Mentor Detail")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-16 md:gap-24"
          >
            {mentors.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="relative inline-block mb-8">
                  <div className="absolute -inset-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-full group-hover:border-cyan-500/50 transition-colors duration-700"></div>
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-transparent bg-gradient-to-tr from-cyan-500 to-transparent p-1">
                    <img
                      src={m.image}
                      className="w-full h-full rounded-full object-cover shadow-lg"
                      alt={m.name}
                    />
                  </div>
                </div>

                <h3
                  className={`text-2xl font-bold mb-2 ${isKhmer ? "font-bold" : ""}`}
                >
                  {m.name}
                </h3>
                <div className="inline-block px-6 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 text-sm mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  {m.role}
                </div>

                <div className="flex justify-center gap-4 text-gray-400 dark:text-gray-500">
                  {/* Facebook */}
                  <a
                    href={m.links.fb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  >
                    <FaFacebook size={24} />
                  </a>

                  {/* GitHub */}
                  <a
                    href={m.links.gh}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  >
                    <FaGithub size={24} />
                  </a>

                  {/* Telegram */}
                  <a
                    href={m.links.tg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  >
                    <FaTelegramPlane size={24} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white ${headingFontClass}`}
          >
            {t("Our")}{" "}
            <span className="text-cyan-600 dark:text-cyan-400">
              {t("Members")}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t("Member Detail")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {team.map((person, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group flex flex-col items-center"
            >
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 border border-dashed border-gray-200 dark:border-gray-800 rounded-full scale-95 group-hover:scale-100 transition-transform duration-500 group-hover:border-cyan-500/30"></div>
                <div className="w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-cyan-500/20 p-1">
                  <img
                    src={person.image}
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 shadow-md"
                    alt={person.name}
                  />
                </div>
              </div>

              <h4
                className={`text-xl font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ${isKhmer ? "font-bold" : ""}`}
              >
                {person.name}
              </h4>

              <div className="inline-block px-5 py-1 bg-gray-100 dark:bg-gray-800/40 rounded-full text-gray-500 dark:text-gray-500 text-xs mb-5 border border-gray-200 dark:border-gray-800 uppercase tracking-widest font-semibold">
                {person.role}
              </div>

              {/* Updated Link Section */}
              <div className="flex gap-4 text-gray-400">
                <a
                  href={person.links.fb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-800 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-600 transition-all"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href={person.links.gh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-800 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-600 transition-all"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={person.links.tg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-800 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-600 transition-all"
                >
                  <FaTelegramPlane size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-24 bg-white dark:bg-[#03081c] text-center border-t border-gray-100 dark:border-gray-900"
      >
        <div className="container mx-auto px-6">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white ${headingFontClass}`}
          >
            {t("Questions")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            {t("Join Community")}
          </p>
          <motion.a
            href="https://t.me/@istadkh" // Replace with your link
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-cyan-600 dark:bg-cyan-500 text-white dark:text-[#020617] px-12 py-4 rounded-full font-bold text-lg hover:bg-cyan-700 transition-all shadow-lg flex items-center gap-3 mx-auto w-fit cursor-pointer ${isKhmer ? "font-kantumruy" : ""}`}
          >
            <FaEnvelope /> {t("Get In Touch")}
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
