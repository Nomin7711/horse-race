const testConstants = {
  apiBaseUrl: "https://horse-api-test.loto.mn:8080/api/",
  // apiBaseUrl: "http://172.16.10.37:8000/api/",
  domain: "https://horse-api-test.loto.mn:8080/",
  isTest: true,
};

const prodConstants = {
  apiBaseUrl: "https://horse-api.loto.mn/api/",
  domain: "https://horse-api.loto.mn/",
  isTest: false,
};

export const config = {
  ...(import.meta.env.MODE === "production" ? prodConstants : testConstants),
};
