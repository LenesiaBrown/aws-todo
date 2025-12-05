// WAS NOT USED! - Can be used if I want to use Tailwind CSS styled auth UI instead of Amplify's built-in one


import React, { useState } from "react";
import { signIn, signUp, signOut } from "aws-amplify/auth";

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("signIn"); // "signIn" or "signUp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // NEW
  const [showPassword, setShowPassword] = useState(false); // NEW
  const [error, setError] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn({ username: email, password });

      // We’ll store a simple user object. You can expand this later.
      const signedInUser = {
        email,
        username: email,
        signInDetails: { loginId: email },
      };

      if (result.isSignedIn) {
        setUser(signedInUser);
      }
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Could not sign in. Check your email/password and try again.");
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");

    // ✅ Check that passwords match before calling AWS
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      await signUp({ username: email, password });
      alert("Account created! Now sign in with your email and password.");
      setMode("signIn");
      setConfirmPassword(""); // clear confirm password
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Could not create account. Try a stronger password or another email.");
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      setUser(null);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
    }
  }

  // If NOT logged in → show Tailwind login/signup UI
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-4">
        <div className="w-full max-w-md bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
          <h1 className="text-xl font-bold mb-1 text-center">AWS To-Do</h1>
          <p className="text-xs text-slate-400 text-center mb-4">
            {mode === "signIn"
              ? "Sign in to manage your cloud-synced tasks."
              : "Create an account to start saving tasks in the cloud."}
          </p>

          {error && (
            <p className="text-xs text-rose-400 mb-2 text-center">{error}</p>
          )}

          <form
            onSubmit={mode === "signIn" ? handleSignIn : handleSignUp}
            className="space-y-3"
          >
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-800 px-3 py-2 rounded-lg text-sm outline-none border border-slate-700 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password with show/hide toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-slate-800 px-3 py-2 rounded-lg text-sm outline-none border border-slate-700 focus:border-indigo-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-slate-400 hover:text-slate-200 text-xs"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm password (only for Create Account) */}
            {mode === "signUp" && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-slate-800 px-3 py-2 rounded-lg text-sm outline-none border border-slate-700 focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />            
            )}

            

            <button
              type="submit"
              className="w-full bg-indigo-500 py-2 rounded-lg font-semibold text-white hover:bg-indigo-600 transition-colors text-sm"
            >
              {mode === "signIn" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-xs text-center mt-3 text-slate-400">
            {mode === "signIn" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300"
                  onClick={() => setMode("signUp")}
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300"
                  onClick={() => setMode("signIn")}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  // If logged in → pass `user` and `signOut` into the child (your App)
  const childWithProps = React.cloneElement(children, {
    user,
    signOut: handleSignOut,
  });

  return childWithProps;
}






































// import { useState } from "react";
// import { signIn, signUp } from "aws-amplify/auth";

// export default function AuthWrapper({ children }) {
//   const [user, setUser] = useState(null);
//   const [mode, setMode] = useState("signIn"); // "signIn" or "signUp"
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSignIn(e) {
//     e.preventDefault();
//     try {
//       const { isSignedIn } = await signIn({ username: email, password });
//       if (isSignedIn) setUser({ email });
//     } catch (error) {
//       console.error("Error signing in:", error);
//     }
//   }

//   async function handleSignUp(e) {
//     e.preventDefault();
//     try {
//       await signUp({ username: email, password });
//       alert("Account created! Please sign in.");
//       setMode("signIn");
//     } catch (error) {
//       console.error("Error signing up:", error);
//     }
//   }

//   if (user) return <>{children}</>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-4">
//       <div className="w-full max-w-md bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
//         <h1 className="text-xl font-bold mb-4 text-center">AWS To-Do</h1>

//         <form onSubmit={mode === "signIn" ? handleSignIn : handleSignUp} className="space-y-3">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full bg-slate-800 px-3 py-2 rounded-lg text-sm"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full bg-slate-800 px-3 py-2 rounded-lg text-sm"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-500 py-2 rounded-lg font-semibold text-white hover:bg-indigo-600"
//           >
//             {mode === "signIn" ? "Sign In" : "Create Account"}
//           </button>
//         </form>

//         <p className="text-xs text-center mt-3 text-slate-400">
//           {mode === "signIn" ? (
//             <>Don't have an account?{" "}
//               <button className="text-indigo-400" onClick={() => setMode("signUp")}>
//                 Create one
//               </button>
//             </>
//           ) : (
//             <>Already have an account?{" "}
//               <button className="text-indigo-400" onClick={() => setMode("signIn")}>
//                 Sign in
//               </button>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// }
