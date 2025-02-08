import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const useUserInfo = () => useContext(UserContext);