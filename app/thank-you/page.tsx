"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHome } from "@fortawesome/free-solid-svg-icons";
import { siteConfig } from "@/config/site";
import { ReferralBanner } from "@/components/shared/referral-banner";
import { useCrioWebForm } from "@/hooks/use-crio-web-form";
import { useLeadConversion } from "@/hooks/use-lead-conversion";

export default function ThankYouPage() {
  useCrioWebForm();
  useLeadConversion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 pt-24 sm:pt-20 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-20 w-full">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-6 sm:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>
          <div className="relative">
            <motion.div
              className="mb-4 sm:mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faCheckCircle} className="text-white text-3xl sm:text-6xl" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <motion.h1
                className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                ¡Gracias!
              </motion.h1>

              <motion.div
                className="text-center mb-6 sm:mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.div
                  className="inline-block text-4xl sm:text-6xl mb-2 sm:mb-4"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  📱
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">¡Revise su teléfono!</h2>
                <p className="text-base sm:text-lg text-gray-600">Le acabamos de enviar un mensaje de texto</p>
              </motion.div>

              <motion.div
                className="text-center mb-6 sm:mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <p className="text-lg sm:text-2xl text-gray-700 leading-relaxed">
                  Nos comunicaremos con usted <strong className="text-blue-600">en breve</strong>
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
                <div className="relative">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <motion.span
                      className="text-xl sm:text-2xl font-bold text-emerald-500 mr-2 sm:mr-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✓
                    </motion.span>
                    <span className="text-lg sm:text-xl font-semibold text-gray-800">Guarde nuestro número:</span>
                  </div>
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    {siteConfig.phone.display}
                  </motion.div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">Para que reconozca nuestra llamada</p>
                </div>
              </motion.div>

              <ReferralBanner layout="stack" />

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:scale-105 transform"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Volver al Inicio
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Denali Health Plant City • 1601 W. Reynolds St, Suite 203, Plant City, FL 33563
        </p>
      </div>
    </div>
  );
}
