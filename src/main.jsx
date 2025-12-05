import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";


import "@aws-amplify/ui-react/styles.css";

import "./index.css";

import App from "./App.jsx";

Amplify.configure(awsExports);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);














// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { Amplify } from 'aws-amplify'
// import awsExports from './aws-exports'
// import "@aws-amplify/ui-react/styles.css";
// import './index.css'
// import App from './App.jsx'

// // Connect this React app to your Amplify backend
// Amplify.configure(awsExports)


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
