import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.REACT_APP_POCKETBASE_URL || "http://localhost:8090");

export default pb;
