'use client'

import Customzaizer from "@/app/componnent/newlandingpage/Customaizer";
import SocialProof from "@/app/componnent/newlandingpage/SocialProof";
import Giftme from "../../../componnent/howitwork/Giftme";
import Hero from "../../../componnent/howitwork/Hero";
import Howwork from "../../../componnent/howitwork/Howwork";

const HowItWorks = () => {
    return (
        <div>
            <Hero />
            {/* <Video /> */}
            <Customzaizer />
            <Howwork />
            {/* <Example /> */}
            <SocialProof />
            <Giftme />
            {/* <Footer /> */}
        </div>
    )
}

export default HowItWorks;