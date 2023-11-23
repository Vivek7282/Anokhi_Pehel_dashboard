// import React, { useState } from "react";
// import axios from "axios";
// // import Header from "./Header";
// // import Image from "../image/340434.png";
// // import { BASE_URL } from "../Service/helper";
// export default function AddStudents() {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     address: "",
//   });

//   //   const [file, setFile] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", credentials.name);
//     formData.append("address", credentials.address);

//     axios
//       .post(`${BASE_URL}/api/addSchool`, formData)
//       .then((res) => {
//         console.log(res);
//         // Check if the response indicates success (you should have a proper way to determine success)
//         if (res.data === "School Added") {
//           // Show an alert message
//           alert("School submitted successfully!");
//           // Clear the form data by resetting the state
//           setCredentials({
//             name: "",
//             address: "",
//           });
//         }
//       })
//       .catch((err) => {
//         console.log("error", err);
//       });
//   };

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${Image})`,
//         backgroundSize: "cover",
//         backgroundAttachment: "fixed",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Header />
//       <div className="container d-flex justify-content-center align-items-center">
//         <form
//           className="mx-auto w-md-100 w-lg-100 m-2 p-2 border rounded bg-dark text-white"
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//         >
//           <div className="m-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               placeholder="Name"
//               value={credentials.name}
//               onChange={onChange}
//               aria-describedby="emailHelp"
//             />
//           </div>
//           <div className="m-3">
//             <label htmlFor="school" className="form-label">
//               Complete Address
//             </label>
//             <input
//               type="school"
//               className="form-control"
//               name="address"
//               placeholder="Complete Address"
//               value={credentials.address}
//               onChange={onChange}
//               aria-describedby="emailHelp"
//             />
//           </div>

//           <button type="submit" className="m-3 btn btn-success">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
