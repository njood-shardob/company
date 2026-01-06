import React from "react";
import HeroSliderTyping from "../HeroSliderTyping/HeroSliderTyping";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import CompanyOverview from "../CompanyOverview/CompanyOverview";
import FeaturedProjectsSnap from "../FeaturedProjectsSplitSlider/FeaturedProjectsSplitSlider";
import MissionVision from "../MissionVision/MissionVisionC";
import ServicesSplitShowcase from "../ServicesSplitShowcase/ServicesSplitShowcase";


export default function Home() {
  return (
    <div className="heroWrap">
      <HeroSliderTyping /> 
      <Navbar />
      <CompanyOverview/>
       <FeaturedProjectsSnap/>
       <MissionVision/>
     <ServicesSplitShowcase/> 
       
    </div>
  );
}