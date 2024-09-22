import { IonContent, IonHeader, IonItemDivider, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Gallery from '../components/Gallery/Gallery';
import Footer from '../components/Footer/Footer';

const GalleryPage: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* <ExploreContainer name="Tab 3 page" /> */}
        <IonItemDivider className='bg-[#00000096] pt-[68px] h-[214px] w-[100vw] flex justify-center items-center'>
          <IonItemDivider className='text-white text=[1.2rem] bg-transparent text-4xl font-extrabold w-[100vw] text-center'>Gallery</IonItemDivider>
        </IonItemDivider>
        <br />
        <Gallery />
        <br />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default GalleryPage;
