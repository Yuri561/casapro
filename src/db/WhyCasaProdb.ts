// db/WhyCasaProdb.tsx

import React from "react";
import {
  Home,
  ClipboardCheck,
  TrendingUp,
  Shield,
  Clock,
  Settings,
} from "lucide-react";

export interface FeatureCard {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const cards: FeatureCard[] = [
  {
    icon: Home,
    title: "Effortless Home Management",
    desc: "Casa Pro is designed to streamline the organization of your home, ensuring you always know what you own and where it's stored. Manage your belongings effortlessly with our intuitive interface.",
  },
  {
    icon: ClipboardCheck,
    title: "Accurate Inventory Tracking",
    desc: "Keep precise records of all your items with real-time updates and robust categorization. Our system ensures you have an accurate overview of your inventory at all times.",
  },
  {
    icon: TrendingUp,
    title: "Boost Efficiency",
    desc: "By automating routine tasks and providing smart analytics, Casa Pro helps you optimize your inventory management process, saving you time and reducing manual errors.",
  },
  {
    icon: Shield,
    title: "Secure Data Management",
    desc: "Your data is safe with us. Casa Pro uses industry-standard security measures to protect your personal inventory information and maintain your privacy.",
  },
  {
    icon: Clock,
    title: "Time-Saving Automation",
    desc: "Spend less time managing your belongings and more time enjoying your home. Our automated features streamline inventory updates, reminders, and alerts for a hassle-free experience.",
  },
  {
    icon: Settings,
    title: "Customizable & Scalable",
    desc: "Whether you're managing a small collection or a large household, Casa Pro adapts to your needs. Enjoy a flexible system that grows with you and can be tailored to your unique preferences.",
  },
];

export default cards;
