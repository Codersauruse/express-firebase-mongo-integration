import toast from "react-hot-toast";

const handleGoogleLoginSuccess = async (tokenResponse) => {
  try {
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user info");
    }

    const userInfo = await userInfoResponse.json();
    console.log("User Info:", userInfo);
    toast.success(`Welcome, ${userInfo.name}`);
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Error fetching user info");
  }
};
// Log in a user
// const LoginSuccess = async (tokenResponse) => {
//   try {
//     const response = await Apiclient.get(API_URL + "login", {
//       username,
//       email,
//       password,
//     });

//     if (response.data.token) {
//       // Store user data (including token) in localStorage
//       localStorage.setItem("user", JSON.stringify(response.data));
//     }

//     return response.data; // Return the server response
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       "An error occurred during login. try again";
//     throw new Error(errorMessage);
//   }
// };

export { handleGoogleLoginSuccess };
