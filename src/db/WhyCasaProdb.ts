import { LucideIcon, ClipboardList,
    Box,
    BarChart3,
    ShieldCheck,
    Smartphone,
    FileBarChart,
    } from "lucide-react";


interface Card {
  icon: LucideIcon;
  title: string;
  desc: string;
}
const cards: Card[] = [
    {
      icon: ClipboardList,
      title: "Easy Item Management",
      desc: "Add, update, and categorize home items effortlessly with just a few clicks.",
    },
    {
      icon: Box,
      title: "Smart Categorization",
      desc: `Automatically group your inventory into categories like Groceries,
              Tools, and more.`,
    },
    {
      icon: BarChart3,
      title: "Real-Time Insights",
      desc: `Stay on top of your inventory with visual data and real-time
              updates.`,
    },
    {
      icon: ShieldCheck,
      title: "Secure Backup",
      desc: `Protect your data with secure cloud storage and backup options.`,
    },
    {
      icon: Smartphone,
      title: "Multi-Device Sync",
      desc: `Access your inventory anytime, anywhere, from any device.`,
    },
    {
      icon: FileBarChart,
      title: " Inventory Reports",
      desc: `Generate detailed reports to monitor and manage your inventory
              with ease.`,
    },
    
  ];
  
  export default cards;