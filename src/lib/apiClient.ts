import config from "@/config";
import { ofetch } from "ofetch";

// const BASE_URL=config.base_api_URL

const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // baseURL: BASE_URL,
  credentials: "include",
});

export default apiClient;
