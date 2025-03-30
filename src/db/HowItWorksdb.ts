import { LucideIcon, BarChart3, Box, ClipboardList } from "lucide-react";


interface Card {
  icon: LucideIcon;
  title: string;
  desc: string;
}
const cards: Card[] = [
    {
      icon: ClipboardList,
      title: "Add Your Items",
      desc: "Scan/manually input your home items with ease.",
    },
    {
      icon: Box,
      title: "Categorize & Manage",
      desc: "Group and organize items for better control.",
    },
    {
      icon: BarChart3,
      title: "Track & Report",
      desc: "Generate reports and gain valuable insights.",
    },
  ];
  
  export default cards;