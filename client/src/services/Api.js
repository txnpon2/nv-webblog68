import axios from "axios";
import { useAuthenStore } from "../stores/authen"; // <-- 1. ต้อง import store

export default () => {
  const authenStore = useAuthenStore(); // <-- 2. เรียกใช้ store

  return axios.create({
    baseURL: "http://localhost:8081/",
    headers: {
      // 3. บรรทัดนี้สำคัญที่สุด! ถ้าไม่มีบรรทัดนี้ Server จะไม่ให้เข้า
      Authorization: `Bearer ${authenStore.token}`,
    },
  });
};
