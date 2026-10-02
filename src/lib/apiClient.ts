import config from "@/config";
import { ofetch } from "ofetch";

const apiClient=ofetch.create({
    baseURL:config.base_api_URL
})

export default apiClient