import "./Home.css";
import ChairmanPhoto from "./photo/chairman.jpg";
import MitNafis from "./abc.jpg";
import Ach1 from "./photo/ach1.jpg";
import Ach2 from "./photo/ach2.jpg";

import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
export default function HomeMain() {
  const authorities = [
    {
      name: "অধ্যাপক ড. মোঃ আফতাব আলী শেখ",
      designation: "চেয়ারম্যান, (প্রফেসর, রসায়ন বিভাগ,ঢাকা বিশ্ববিদ্যালয়)",
      image: `${ChairmanPhoto}`,
    },
    {
      name: "ড. মোঃ সারওয়ার জাহান",
      designation: "সদস্য (বিজ্ঞান ও প্রযুক্তি)  ",
      image: `${MitNafis}`,
    },
  ];

  const achievements = [
    {
      title: "পুস্তক উদ্ভোদন",
      image: `${Ach1}`,
      description:
        "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের মাননীয় প্রধানমন্ত্রী জননেত্রী শেখ হাসিনা, বিসিএসআইআর এর সন্মানিত চেয়ারম্যান অধ্যাপক ড. মোঃ আফতাব আলী শেখ মহোদয় কর্তৃক সম্পাদিত বঙ্গবন্ধুর বিজ্ঞান ভাবনা ও বাংলাদেশ শীর্ষক বইয়ের মোড়ক উন্মোচন করেন।",
    },
    {
      title: "কর্মশালা",
      image: `${Ach2}`,
      description:
        "বিসিএসআইআর ঢাকা গবেষণাগার কর্তৃক আয়োজিত শিল্প প্রযুক্তির উন্নয়ন, স্মার্ট বাংলাদেশ বাস্তবায়ন শীর্ষক অংশীজন কর্মশালা ১৯ মার্চ ২০২৩ সকাল ১০.৩০ ঘটিকায় বিসিএসআইআর ঢাকা ক্যাম্পাসে অনুষ্ঠিত হয়।   কর্মশালায় প্রধান অতিথি হিসেবে উপস্থিত ছিলেন অধ্যাপক ড. মোঃ আফতাব আলী শেখ, চেয়ারম্যান, বিসিএসআইআর।",
    },
  ];

  const nav = useNavigate();
  <>
    <p>hi i am el</p>
  </>;
  return (
    <>
    <div className="shade1 full_page_height">
      <div className="p-5 shade2">
        <div className="row m-5 p-3 shade3">
          <center><p className="display-6">Welcome to BCSIR</p></center><hr/><br/>
            <p>
                বাংলাদেশ বিজ্ঞান ও শিল্প গবেষণা পরিষদ (বিসিএসআইআর) তদানীন্তন
                পিসিএসআইআর-এর অঙ্গ প্রতিষ্ঠান ’পূর্বাঞ্চলীয় গবেষণাগার’ নামে ১৯৫৫
                সালে কার্যক্রম শুরু করে। বাংলাদেশের স্বাধীনতার পর এদেশে বিজ্ঞান ও
                প্রযুক্তির অগ্রযাত্রাকে ত্বরান্বিত করতে ১৯৭৩ সালে জাতির পিতা
                বঙ্গবন্ধু শেখ মুজিবুর রহমান এক অধ্যাদেশ জারীর মাধ্যমে ‘বাংলাদেশ
                বিজ্ঞান ও শিল্প গবেষণা পরিষদ (বিসিএসআইআর)’ প্রতিষ্ঠা করেন। বর্তমান
                সরকার ২০১৩ সালে ’বিসিএসআইআর আইন ২০১৩’ জাতীয় সংসদে অনুমোদন করেন এবং
                বিসিএসআইআর বর্তমানে এই আইন দ্বারাই পরিচালিত হচ্ছে।
            </p>
        </div>
        <div className="row m-5 p-3 shade3">
          <center><p className="display-6">Our Authority</p></center><hr/><br/>
            {authorities.map((authority, index) => (
                  <div className="col" key={index}>
                    <div className="shade2 p-3">
                      <center>
                        <img src={authority.image} alt={authority.name} style={{height:"300px",width:"300px"}}
                        /><br /><hr />
                        <h5>{authority.name}</h5>
                        <p>{authority.designation}</p>
                      </center>
                    </div>
                  </div>
                ))}
        </div>
        
        <div className="row m-5 p-3 shade3">
        <center><p className="display-6">Image Gallary</p></center><hr/><br/>
          {achievements.map((authority, index) => (
                  <div className="col" key={index}>
                    <div className="shade2 p-3">
                      <center>
                        <img src={authority.image} alt={authority.name} style={{height:"300px",width:"400px"}}
                        /><br /><hr />
                        <h5>{authority.title}</h5>
                        <p>{authority.description}</p>
                      </center>
                    </div>
                  </div>
                ))}
        </div>

      </div>
      
    </div>
    </>
  );
}
