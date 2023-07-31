// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const AuthenticatedRoutes = ({ children }) => {
//   const { isAuthenticated } = React.useContext(AuthContext);

//   return (
//     <Routes>
//       {children.map((child) => {
//         const { path, element } = child.props;
//         return isAuthenticated ? (
//           <Route key={path} path={path} element={element} />
//         ) : (
//           <Navigate key={path} to="/" />
//         );
//       })}
//     </Routes>
//   );
// };

// export default AuthenticatedRoutes;
