import axios from "axios";
const client = axios.create({
  baseURL: "https://networkgraph-backend.pharmaacuity.com/",
});

// "http://pa-v2-api-nlb-3c27031a599085c6.elb.us-east-2.amazonaws.com:3000"

const fetchAllData = async () => {
  try {
    let response = await client.get("/elastic/getall");

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchHcpDetails = async (id) => {
  try {
    let response = await client.get(`/elastic/getone?uuid=${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { fetchAllData, fetchHcpDetails };
