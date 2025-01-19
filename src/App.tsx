// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "./features/app/reduxHooks";
import HomePage from "./pages/Home.page";
// import { auth, fetchAllTasks } from "./features/Firebase/firebaseConfig";
// import { userIn } from "./features/slice/UserAuth/userAuthSlice";
// import { seedAllTask } from "./features/slice/Task/task";
// import { onAuthStateChanged } from "firebase/auth";


const App = () => {
  // const dispatch = useAppDispatch();
  // const isAuth = useAppSelector(state=> state.userauth.isAuth);
//   useEffect(()=>{
//     const unsubscribe = onAuthStateChanged(auth, (user: any) => {
//       if (user) {
//           // Redirect to dashboard or authenticated route
//           dispatch(userIn(user.profileImg));
//           const fetchAndDispatchNotes = async () => {
//             if (isAuth) {
//               try {
//                 const allTasks = await fetchAllTasks();
//                 dispatch(seedAllTask(allTasks));
//               } catch (error) {
//                 console.error('Error fetching tasks:', error);
//               }
//             }
//           };
//           fetchAndDispatchNotes();

//       }
//   });
  
//   // Clean up the listener on component unmount
//   return () => unsubscribe();
// },[isAuth, dispatch])
  return (
    <div className="min-h-screen md:py-10 md:px-8">
      <HomePage/>
    </div>
  );
}

export default App;
