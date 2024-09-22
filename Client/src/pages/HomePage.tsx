import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/BodyContainer';
import './Tab1.css';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import Footer from '../components/Footer/Footer';
import FounderSection from '../components/FounderSection/FounderSection';
import FeaturedNewsCarousel from '../components/FeaturedNewsCarousel/FeaturedNewsCarousel';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <ImageSlider />
        <FounderSection />
        <div className='font-extrabold text-gray-800 w-[100vw] text-center text-4xl'>Featured On</div>
        <FeaturedNewsCarousel />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
