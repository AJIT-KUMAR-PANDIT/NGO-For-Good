import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import AboutSlider from '../components/AbourSlider/AboutSlider';
import AboutSection from '../components/AboutSection/AboutSection';
import Footer from '../components/Footer/Footer';


const AboutPage: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" /> */}
        <AboutSlider />
        <AboutSection />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
