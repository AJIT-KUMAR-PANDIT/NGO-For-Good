import React, { useState, useEffect, useRef } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRefresher,
  IonRefresherContent,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, informationCircle, images, cash, menu } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import NavBar from './components/NavBar/NavBar';
import Menu from './components/Menu/Menu';
import DonationPage from './pages/DonationPage';
import PaymentVerification from './pages/PaymentVerification';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

setupIonicReact();

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const refresherRef = useRef<HTMLIonRefresherElement>(null); // Create a ref for IonRefresher

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  // useEffect(() => {
  //   console.log('Route changed to:', location.pathname);

  //   // Trigger a refresh programmatically
  //   if (refresherRef.current) {
  //     refresherRef.current.complete(); // Call complete() or other methods as needed
  //   }
  // }, [location.pathname]);

  return (
    <>
      <Menu open={isOpen} onClose={handleCloseMenu} />
      <IonApp>
        <NavBar />
        <IonReactRouter basename="/">
          <IonTabs>
            <IonRouterOutlet id='main'>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/contact" component={GalleryPage} />
              <Route exact path="/donate" component={DonationPage} />
              <Route exact path="/gallery" component={GalleryPage} />
              <Route exact path="/verify" component={PaymentVerification} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className='md:hidden'>
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} className="h-5 w-5" aria-hidden="true" />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="about" href="/about">
                <IonIcon icon={informationCircle} className="h-5 w-5" aria-hidden="true" />
                <IonLabel>About</IonLabel>
              </IonTabButton>
              <IonTabButton tab="gallery" href="/gallery">
                <IonIcon icon={images} className="h-5 w-5" aria-hidden="true" />
                <IonLabel>Gallery</IonLabel>
              </IonTabButton>
              <IonTabButton tab="donate" href="/donate">
                <IonIcon icon={cash} className="h-5 w-5" aria-hidden="true" />
                <IonLabel>Donate</IonLabel>
              </IonTabButton>
              <IonTabButton tab="menu" onClick={toggleMenu}>
                <IonIcon icon={menu} className="w-6 h-6" aria-hidden="true" />
                <IonLabel>Menu</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default App;
