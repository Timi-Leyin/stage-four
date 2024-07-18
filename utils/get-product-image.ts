import { ENV } from "@/constants/env";

export default (image: string) => `${ENV.TIMBU_BASE_URL}/images/${image}`;
