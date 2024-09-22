import { IonContent, IonHeader, IonImg, IonItemDivider, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Footer from '../components/Footer/Footer';
import DonationForm from '../components/Donations/DonationForm/DonationForm';

const DonationPage: React.FC = () => {
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
                    <IonItemDivider className='text-white text=[1.2rem] bg-transparent text-4xl font-extrabold w-[100vw] text-center'>Donate For Cause!</IonItemDivider>
                </IonItemDivider>
                <br />
                <IonItemDivider className='flex justify-center items-center w-[100vw]'>
                    <div>
                        <IonItemDivider className='flex flex-col justify-center items-center self-center md:flex-row'>
                            <IonItemDivider >
                                <IonImg src='./logo.png' />
                            </IonItemDivider>
                            <IonItemDivider>
                                <DonationForm />
                            </IonItemDivider>
                        </IonItemDivider>
                    </div>
                </IonItemDivider>
                <br />
                <Footer />
            </IonContent>
        </IonPage>
    );
};

export default DonationPage;
