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
// const URL = "https://jsonplaceholder.typicode.com/users";
// async function getInformation() {
//   let response = await fetch(URL);
//   let data = await response.json();
//   data.forEach((element) => {
//     console.log(
//       `Name: ${element.name} \nEmail: ${element.email} \nStreet: ${element.address.street}\nCity: ${element.address.city}`
//     );
//   });
// }
// getInformation();

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
        reject("Did not get value");
      },
      () => {
        alert("No location Found");
      }
    );
  });
}

// async function gettingPos() {
//   let val = await fetch(`https://restcountries.com/v3.1/name/bangladesh`);
//   if (val.ok === false) throw new Error("SOMETHING WRONG GONE!!");
//   let data = await val.json();
//   console.log(data);
//   return "Testing Return";
// }
// (async function () {
//   let val = await gettingPos();
//   console.log(val);
// })();
