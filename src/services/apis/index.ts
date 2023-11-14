import axios from "axios";
import { BASE_URI } from "../../constant";
import toast from "react-hot-toast";

export const fetch_Customer = async () => {
  try {
    const res = await axios.get(BASE_URI);
    return res.data.data;
  } catch (error) {
    console.log(error, "Fetch Customer");
    toast.error("This didn't work.");
  }
};
