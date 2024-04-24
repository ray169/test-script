const axios = require("axios");
const _ = require("lodash");
let data = "";

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://api-sit-galacticdice.firatopia-api.com/dev/normal-card-gacha",
  headers: {},
  data: data,
};

const getNormalGacha = async () => {
  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

(async () => {
  let results = []; // Move declaration inside the loop
  let tierSIndex= []
    for (let i = 0; i < 1000; i++) {
      const data = await getNormalGacha();
      if (data.tier === 'S') {
        tierSIndex.push(i)
      }
      results.push(data); // Push datas array into results
    }

  const groupby = _.chain(results).groupBy("tier").value();
  const tierN = _.chain(groupby).get("N").groupBy("id").mapValues('length').value();
  const tierR = _.chain(groupby).get("R").groupBy("id").mapValues('length').value();
  const tierS = _.chain(groupby).get("S").groupBy("id").mapValues('length').value();
  const totalGacha = _.chain(groupby).mapValues('length').value();
  console.log(
    JSON.stringify(
      {
        tierSIndex,
        totalGacha,
        tierN,
        tierR,
        tierS,
      },
      null,
      4
    )
  ); // Move console.log inside the loop
})();
