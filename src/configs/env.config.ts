import { load } from "ts-dotenv";

const env = load({
	JWT_SECRET: String,
});

export default env;
