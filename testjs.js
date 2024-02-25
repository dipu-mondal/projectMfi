// function getData(dataID) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(dataID);
//       resolve("success");
//     }, 2000);
//   });
// }

// async function allDataAPI() {
//   await getData(1);
//   await getData(2);
//   await getData(3);
//   await getData(4);
// }
// allDataAPI();
const URL = "https://jsonplaceholder.typicode.com/users";
async function getInformation() {
  let response = await fetch(URL);
  let data = await response.json();
  data.forEach((element) => {
    console.log(
      `Name: ${element.name} \nEmail: ${element.email} \nStreet: ${element.address.street}\nCity: ${element.address.city}`
    );
  });
}
getInformation();
