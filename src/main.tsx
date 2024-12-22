import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './app/App.tsx'
import { Provider } from 'react-redux';
import store from './app/store.ts';
import { MsalProvider } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";

const msalConfiguration: Configuration = {
  auth: {
      clientId: "6fef5605-41aa-4e14-a4f6-cac9b95c4f36", // the only mandatory field in this object, uniquely identifies your app
      // here you'll add the other fields that you might need based on the Azure portal settings
      authority: "https://login.microsoftonline.com/c3c43524-7c76-4490-aac4-7a82fa8e6496",
  }
};

const pca = new PublicClientApplication(msalConfiguration)

createRoot(document.getElementById('root')!).render(
  <MsalProvider instance={pca}>
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
  </MsalProvider>
)
