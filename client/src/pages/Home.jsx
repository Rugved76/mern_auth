// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const Home = () => {
//     const navigate = useNavigate();
//     const [cookies, removeCookie] = useCookies([]);
//     const [email, setEmail] = useState("");

//     useEffect(() => {
//         const verifyCookie = async () => {
//             if (!cookies.token) {
//                 navigate("/login");
//             }
//             const { data } = await axios.post(
//                 "http://localhost:4000",
//                 {},
//                 { withCredentials: true }
//             );
//             const { status, user } = data;
//             setEmail(user);
//             return status
//                 ? toast(`Hello ${user}`, {
//                     position: "top-right",
//                 })
//                 : (removeCookie("token"), navigate("/login"));
//         };
//         verifyCookie();
//     }, [cookies, navigate, removeCookie]);
//     const Logout = () => {
//         removeCookie("token");
//         navigate("/signup");
//     };
//     return (
//         <>
//             <div className="home_page">
//                 <h4>
//                     {" "}
//                     Welcome <span>{email}</span>
//                 </h4>
//                 <button onClick={Logout}>LOGOUT</button>
//             </div>
//             <ToastContainer />
//         </>
//     );
// };

// export default Home;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        let isMounted = true;

        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }

            try {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    { withCredentials: true }
                );

                if (isMounted) {
                    const { status, user } = data;
                    setEmail(user);

                    if (status) {
                        toast(`Hello ${user}`, {
                            position: "top-right",
                        });
                    } else {
                        removeCookie("token");
                        navigate("/login");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        verifyCookie();

        return () => {
            isMounted = false;
        };
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        navigate("/signup");
    };

    return (
        <>
            <div className="home_page">
                <h4>
                    Welcome <span>{email}</span>
                </h4>
                <button onClick={Logout}>LOGOUT</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;
