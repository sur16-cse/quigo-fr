console.log(process.env.API_URL!)
const BASE_URL = process.env.API_URL!;
console.log(BASE_URL);





export async function postData(payload: any, endpoint: string) {
  try {
    console.log(process.env.API_URL!)
// console.log(BASE_URL)
    const data = await fetch(process.env.API_URL!+endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + auth,
      },
      body: JSON.stringify(payload),
    });
    const res = await data.json();
    console.log(res);
    return res;
  } catch (e) {
    console.error("Error", e);
  }
}


export async function getData(url?: any, params?: any, id?: number) {
  let URL;

  if (id != undefined) URL = url + `/${id}`
  else URL = url + `?` + new URLSearchParams(params);
  console.log(URL)
  try {
    const data = await fetch(URL, {
      headers: {
        // Authorization: "Bearer " + auth,
      },
    });

    const res = await data.json();
    return res;
  } catch (e) {
    
    console.error("Error", e);
  }
}


export async function putData(url?: string, payload?: any, id?: number) {
  try {
    console.log(id);
    const response = await fetch(url + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        // Authorization: "Bearer " + auth,
      },
      body: JSON.stringify(payload),
    });

    const resData = await response.json();
    return resData;
  } catch (e) {
    console.error("Error", e);
  }
}


export async function deleteData(url?: string, id?: number) {
  try {
    const response = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        // Authorization: "Bearer " + auth,
      },
    });
  } catch (e) {
    console.error("Error", e);
  }
}