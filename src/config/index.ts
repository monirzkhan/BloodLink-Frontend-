import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.join(process.cwd(), ".env")})

export default{
    base_api_URL:process.env.NEXT_PUBLIC_API_BASE_URL
}