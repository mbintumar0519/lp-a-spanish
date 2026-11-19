"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/cn";
import { useBookingDetection } from "@/hooks/use-booking-detection";

const FACT_ROTATION_MS = 3000;
const SLOW_LOAD_THRESHOLD_MS = 10000;
const IFRAME_REVEAL_DELAY_MS = 500;
const DEFAULT_CALENDAR_ID = "5tFnVrBbAfETptz6sPZ8";

const UC_FACTS = [
  {
    title: "Understanding UC",
    fact: "Ulcerative colitis (UC) is a chronic inflammatory bowel disease that causes inflammation and ulcers in the lining of the colon and rectum.",
  },
  {
    title: "Research Progress",
    fact: "Clinical trials have led to the development of multiple FDA-approved treatments for UC, including biologics, immunomodulators, and targeted therapies.",
  },
  {
    title: "Prevalence",
    fact: "Approximately 907,000 Americans are living with ulcerative colitis, with the condition typically diagnosed between ages 15-30 or 50-70.",
  },
  {
    title: "Disease Course",
    fact: "UC is characterized by periods of active symptoms (flares) and remission, with the goal of treatment being to achieve and maintain remission.",
  },
  {
    title: "Symptoms Vary",
    fact: "UC symptoms can include bloody diarrhea, abdominal pain, urgency, fatigue, and weight loss, with severity varying between individuals.",
  },
  {
    title: "Importance of Research",
    fact: "Clinical trials are essential for developing new treatments and improving quality of life for people with ulcerative colitis.",
  },
  {
    title: "Not Contagious",
    fact: "UC is not contagious or caused by diet or stress, though these factors may influence symptoms in some people.",
  },
  {
    title: "Personalized Treatment",
    fact: "Treatment approaches for UC vary by disease extent, severity, and individual response, which is why continued research into new therapies is important.",
  },
];

const calendarId = process.env.NEXT_PUBLIC_GOHIGHLEVEL_CALENDAR_ID || DEFAULT_CALENDAR_ID;

export default function SchedulePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRefreshMessage, setShowRefreshMessage] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useBookingDetection(iframeRef);

  useEffect(() => {
    if (!isLoading) return;

    const factInterval = window.setInterval(
      () => setCurrentFactIndex((index) => (index + 1) % UC_FACTS.length),
      FACT_ROTATION_MS,
    );
    const refreshTimeout = window.setTimeout(() => setShowRefreshMessage(true), SLOW_LOAD_THRESHOLD_MS);

    return () => {
      window.clearInterval(factInterval);
      window.clearTimeout(refreshTimeout);
    };
  }, [isLoading]);

  const currentFact = UC_FACTS[currentFactIndex];

  return (
    <div className="fixed inset-0 w-full h-full bg-white">
      <div className="absolute top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 pt-16 bg-gradient-to-br from-blue-50 to-purple-50 z-20 flex items-center justify-center transition-opacity duration-500 opacity-100">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="mb-8">
              <FontAwesomeIcon icon={faSpinner} className="text-6xl text-medical-primary animate-spin" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loading Your Scheduling Options</h2>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-500">
              <div className="text-medical-primary font-semibold mb-2">Did You Know?</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentFact.title}</h3>
              <p className="text-gray-600">{currentFact.fact}</p>
            </div>

            <div className="flex justify-center space-x-1 mb-6">
              {UC_FACTS.map((fact, index) => (
                <div
                  key={fact.title}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    index === currentFactIndex ? "bg-medical-primary w-8" : "bg-gray-300",
                  )}
                />
              ))}
            </div>

            {showRefreshMessage && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-fade-in">
                <p className="text-gray-700 mb-3">The scheduling system is taking longer than expected to load.</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-primary/90 transition-colors"
                >
                  <FontAwesomeIcon icon={faSync} className="mr-2" />
                  Refresh Page
                </button>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-6">
              This research study is being conducted to evaluate an investigational treatment. Participation is
              voluntary and all study-related care is provided at no cost to eligible participants.
            </p>
          </div>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 pt-16 w-full h-full transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
        )}
      >
        <iframe
          ref={iframeRef}
          src={`https://api.leadconnectorhq.com/widget/booking/${calendarId}`}
          width="100%"
          height="100%"
          className="w-full h-full border-0"
          title="Schedule Lp(a) Testing"
          onLoad={() => window.setTimeout(() => setIsLoading(false), IFRAME_REVEAL_DELAY_MS)}
        />
      </div>
    </div>
  );
}
