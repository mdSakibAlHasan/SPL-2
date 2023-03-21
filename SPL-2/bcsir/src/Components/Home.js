import './Home.css'
import ChairmanPhoto from './photo/chairman.jpg'
import MitNafis from './photo/mitnafis.jpg'
import Ach1 from './photo/ach1.jpg'
import Ach2 from './photo/ach2.jpg'

import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer'
export default function HomeMain() {
    const authorities = [
      {
        name: 'অধ্যাপক ড. মোঃ আফতাব আলী শেখ',
        designation: 'চেয়ারম্যান, (প্রফেসর, রসায়ন বিভাগ,ঢাকা বিশ্ববিদ্যালয়)',
        image: `${ChairmanPhoto}`,
      },
      {
        name: 'নাফিস হাসান',
        designation: 'পিএস টু চেয়ারম্যান,BCSIR',
        image: `${MitNafis}`,
      },
    ];
   
    const achievements = [
      {
        title: 'Book Publish',
        image: `${Ach1}`,
        description:
          'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের মাননীয় প্রধানমন্ত্রী জননেত্রী শেখ হাসিনা, বিসিএসআইআর এর সন্মানিত চেয়ারম্যান অধ্যাপক ড. মোঃ আফতাব আলী শেখ মহোদয় কর্তৃক সম্পাদিত বঙ্গবন্ধুর বিজ্ঞান ভাবনা ও বাংলাদেশ শীর্ষক বইয়ের মোড়ক উন্মোচন করেন।',
      },
      {
        title: 'কর্মশালা',
        image: `${Ach2}`,
        description:
          'বিসিএসআইআর ঢাকা গবেষণাগার কর্তৃক আয়োজিত শিল্প প্রযুক্তির উন্নয়ন, স্মার্ট বাংলাদেশ বাস্তবায়ন শীর্ষক অংশীজন কর্মশালা ১৯ মার্চ ২০২৩ সকাল ১০.৩০ ঘটিকায় বিসিএসআইআর ঢাকা ক্যাম্পাসে অনুষ্ঠিত হয়।   কর্মশালায় প্রধান অতিথি হিসেবে উপস্থিত ছিলেন অধ্যাপক ড. মোঃ আফতাব আলী শেখ, চেয়ারম্যান, বিসিএসআইআর।',
      },
    ];
   
    const nav=useNavigate();
    <>
      <p>hi i am el</p>
    </>
      return (
        <div
          className="bg-image"
        //   style={{ backgroundImage: `url${BackgroundPic}` }}
        >
          <div className="container py-5">
            <div className="row">
              <div>
                <h1>Welcome to BCSIR</h1>
                <p>
                বাংলাদেশ বিজ্ঞান ও শিল্প গবেষণা পরিষদ (বিসিএসআইআর)  তদানীন্তন পিসিএসআইআর-এর অঙ্গ প্রতিষ্ঠান ’পূর্বাঞ্চলীয় গবেষণাগার’ নামে ১৯৫৫ সালে কার্যক্রম শুরু করে। বাংলাদেশের স্বাধীনতার পর এদেশে বিজ্ঞান ও প্রযুক্তির অগ্রযাত্রাকে ত্বরান্বিত করতে ১৯৭৩ সালে জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান এক অধ্যাদেশ জারীর মাধ্যমে ‘বাংলাদেশ বিজ্ঞান ও শিল্প গবেষণা পরিষদ (বিসিএসআইআর)’ প্রতিষ্ঠা করেন। বর্তমান সরকার ২০১৩ সালে ’বিসিএসআইআর আইন ২০১৩’ জাতীয় সংসদে অনুমোদন করেন এবং বিসিএসআইআর বর্তমানে এই আইন দ্বারাই পরিচালিত হচ্ছে।
                </p>
              </div>
              <br/><br/>
              <h2>Authority</h2><hr/><br/>
              <div >
                <div className="row row-cols-3">
                  {authorities.map((authority, index) => (
                    <div className="col mb-4" key={index}>
                      <div className="card">
                        <img src={authority.image} className="autho card-img-top" alt={authority.name} />
                        <div className="card-body">
                          <h5 className="card-title">{authority.name}</h5>
                          <p className="card-text">{authority.designation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h2>Image Gallary</h2><hr/><br/>
            <div className="row mt-5">
              {achievements.map((achievement, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <br/>
                  <div className="card">
                    <img src={achievement.image} className="achi card-img-top" alt={achievement.title} />
                    <div className="card-body">
                      <h5 className="card-title">{achievement.title}</h5>
                      <p className="card-text">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer/>
        </div>
      );
  }
  