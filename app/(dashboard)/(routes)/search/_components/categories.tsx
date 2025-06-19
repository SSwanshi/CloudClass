"use client";
import { Category } from "@/lib/generated/prisma";
import { IconType } from "react-icons";

import {
  FcIdea,
  FcEngineering,
  FcCalculator,
  FcBusinessman,
  FcDebt,
  FcBiotech,
  FcRules,
  FcTemplate,
  FcLandscape,
  FcMusic,
  FcCamera,
  FcTimeline,
  FcFilmReel,
  FcEditImage,
  FcFinePrint,
  FcGlobe,
  FcSmartphoneTablet,
  FcOnlineSupport,
  FcConferenceCall,
  FcServices,
  FcDisplay,
  FcMoneyTransfer,
  FcAlarmClock,
  FcSpeaker,
  FcMindMap,
  FcPortraitMode,
  FcHome,
  FcSalesPerformance,
  FcLike,
  FcAutomotive,
  FcProcess,
  FcFactory,
  FcTreeStructure,
  FcSurvey,
  FcGraduationCap,
  FcAdvertising,
  FcDepartment,
  FcLibrary,
  FcReading,
  FcQuestions,
} from "react-icons/fc";
import { CategoryItem } from "./category-item";


interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<string, IconType> = {
  "Computer Science": FcIdea,
  "Engineering": FcEngineering,
  "Mathematics": FcCalculator,
  "Business & Finance": FcBusinessman,
  "Accounting": FcDebt,
  "Science": FcBiotech,
  "Medicine & Healthcare": FcBiotech, // Reused Biotech icon
  "Law & Legal Studies": FcRules,
  "Architecture & Design": FcTemplate,
  "Environmental Science": FcLandscape,
  "Music": FcMusic,
  "Photography": FcCamera,
  "Graphic Design": FcTimeline,
  "Filming": FcFilmReel,
  "Creative Writing": FcEditImage,
  "Fine Arts": FcFinePrint,
  "Fashion Design": FcFinePrint, // Closest visual fit
  "Game Development": FcGlobe, // Placeholder for game/dev
  "Web Development": FcGlobe,
  "Mobile App Development": FcSmartphoneTablet,
  "Cloud Computing": FcOnlineSupport,
  "Blockchain": FcConferenceCall,
  "UI/UX Design": FcServices,
  "IT Certifications": FcDisplay,
  "Personal Finance": FcMoneyTransfer,
  "Productivity": FcAlarmClock,
  "Public Speaking": FcSpeaker,
  "Psychology": FcMindMap,
  "Languages": FcPortraitMode,
  "Parenting": FcPortraitMode,
  "Cooking": FcHome,
  "Fitness": FcSalesPerformance,
  "Yoga & Meditation": FcLike,
  "Nutrition": FcLike,
  "Sports Training": FcSalesPerformance,
  "Martial Arts": FcLike,
  "Automotive Repair": FcAutomotive,
  "Electrician & Plumbing": FcProcess,
  "Carpentry": FcFactory,
  "Agriculture": FcTreeStructure,
  "Aviation": FcSurvey,
  "Test Prep": FcGraduationCap,
  "Career Development": FcAdvertising,
  "Digital Marketing": FcDepartment,
  "Real Estate": FcHome,
  "History": FcLibrary,
  "Philosophy": FcReading,
  "Other": FcQuestions,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}