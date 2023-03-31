import axios from "axios";
const client = axios.create({
  baseURL: "https://networkgraph-backend.pharmaacuity.com/",
});

//https://networkgraph-backend.pharmaacuity.com/
//"http://pa-v2-api-nlb-3c27031a599085c6.elb.us-east-2.amazonaws.com:3000"

const fetchAllData = async () => {
  try {
    let response = await axios.get(
      "https://network-graph-data.s3.us-east-2.amazonaws.com/project_id_a0d3c6ec-e30e-4ccb-925d-7327f1c58031/network_graph.json"
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchHcpDetails = async (id) => {
  try {
    let response = await client.get(
      `elastic/getone?uuid=${id}&project_id=a0d3c6ec-e30e-4ccb-925d-7327f1c58031`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchAffiliations = async (id) => {
  try {
    let response = await client.get(`/elastic/getaffiliation`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchCitations = async (id) => {
  try {
    let response = await client.get(`/elastic/getcitation`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { fetchAllData, fetchHcpDetails, fetchAffiliations, fetchCitations };
