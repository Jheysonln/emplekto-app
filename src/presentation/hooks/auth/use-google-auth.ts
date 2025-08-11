// import { useEffect, useRef } from 'react';
// import { useAuth } from './use-auth';
// import { envConfig } from '@/infrastructure/config/env.config';

// /**
//  * Hook para integrar Google OAuth
//  */
// export const useGoogleAuth = () => {
//   const { loginWithGoogle, isLoading } = useAuth();
//   const googleInitialized = useRef(false);

//   useEffect(() => {
//     // Cargar Google OAuth script
//     if (typeof window !== 'undefined' && !googleInitialized.current) {
//       const script = document.createElement('script');
//       script.src = 'https://accounts.google.com/gsi/client';
//       script.async = true;
//       script.defer = true;
      
//       script.onload = () => {
//         if (window.google) {
//           window.google.accounts.id.initialize({
//             client_id: envConfig.googleClientId,
//             callback: handleGoogleCallback,
//             auto_select: false,
//             cancel_on_tap_outside: true,
//           });
          
//           googleInitialized.current = true;
//         }
//       };
      
//       document.head.appendChild(script);
//     }
//   }, []);

//   const handleGoogleCallback = async (response: any) => {
//     if (response.credential) {
//       await loginWithGoogle(response.credential);
//     }
//   };

//   const signInWithGoogle = (elementId?: string) => {
//     if (window.google && googleInitialized.current) {
//       if (elementId) {
//         // Renderizar botón en elemento específico
//         window.google.accounts.id.renderButton(
//           document.getElementById(elementId),
//           {
//             theme: 'outline',
//             size: 'large',
//             text: 'signin_with',
//             shape: 'rectangular',
//             logo_alignment: 'left',
//             width: 280,
//           }
//         );
//       } else {
//         // Mostrar popup
//         window.google.accounts.id.prompt();
//       }
//     }
//   };

//   const renderGoogleButton = (elementId: string, options: any = {}) => {
//     if (window.google && googleInitialized.current) {
//       const defaultOptions = {
//         theme: 'outline',
//         size: 'large',
//         text: 'signin_with',
//         shape: 'rectangular',
//         logo_alignment: 'left',
//         width: 280,
//         ...options,
//       };

//       window.google.accounts.id.renderButton(
//         document.getElementById(elementId),
//         defaultOptions
//       );
//     }
//   };

//   return {
//     signInWithGoogle,
//     renderGoogleButton,
//     isGoogleLoading: isLoading,
//     isGoogleReady: googleInitialized.current,
//   };
// };