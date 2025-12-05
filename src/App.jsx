import TodoApp from "./components/TodoApp";
import { Authenticator } from "@aws-amplify/ui-react";

// This is your app *after* the user is signed in
function AppShell({ signOut, user }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div>
          <h1 className="text-lg font-semibold">AWS To-Do</h1>
          {user && (
            <p className="text-xs text-slate-400">
              Signed in as{" "}
              <span className="font-medium">
                {user.signInDetails?.loginId ||
                  user.attributes?.email ||
                  user.username}
              </span>
            </p>
          )}
        </div>

        <button
          onClick={signOut}
          className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          Sign out
        </button>
      </header>

      <main>
        <TodoApp />
      </main>
    </div>
  );
}

// Custom header INSIDE the auth card (like your second screenshot)
function AuthHeader() {
  return (
    <div className="text-center mb-4">
      <h1 className="text-xl font-semibold text-slate-50">AWS To-Do</h1>
      <p className="text-xs text-slate-400 mt-1">
        Sign in to manage your cloud-synced tasks.
      </p>
    </div>
  );
}

// Custom footer link (“Don’t have an account? Create one”) is already
// built into Amplify’s form, so we’ll keep the default footer.
// (You can customize it too if you want later.)

export default function App() {
  return (
    <Authenticator components={{ Header: AuthHeader }}>
      {({ signOut, user }) => (
        <AppShell signOut={signOut} user={user} />
      )}
    </Authenticator>
  );
}














// import TodoApp from "./components/TodoApp";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

// function App({ signOut, user }) {
//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-50">
//       <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
//         <div>
//           <h1 className="text-lg font-semibold">AWS To-Do</h1>
//             {user && (
//               <p className="text-xs text-slate-400">
//                 Signed in as{" "}
//                 <span className="font-medium">
//                   {user.signInDetails?.loginId || user.username}
//                 </span>
//               </p>
//             )}
//         </div>

//         <button
//           onClick={signOut}
//           className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700"
//         >
//           Sign out
//         </button>
//       </header>

//       <main>
//         <TodoApp />
//       </main>
//     </div>
//   );
// }

// import AuthWrapper from "./AuthWrapper";
// export default function WrappedApp() {
//   return (
//     <AuthWrapper>
//       <App />
//     </AuthWrapper>
//   );
// }




















// import TodoApp from "./components/TodoApp";

// function App() {
//   return <TodoApp />;
// }

// export default App;

