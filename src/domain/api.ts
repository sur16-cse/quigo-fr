const BASE_URL:any = process.env.NEXT_PUBLIC_API_URL ;

export function LoadEnv()
{
  console.log(BASE_URL)
}

export async function postData(payload?: any, endpoint?: any) {
  try {
    const data = await fetch(BASE_URL+ endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + auth,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const res = await data.json();
    console.log(res);
    return res;
  } catch (e) {
    console.error("Error", e);
  }
}


export async function getData(endpoint?: any, params?: any, id?: string | string[]) {
  let URL;

  if (id != undefined) URL = BASE_URL+ endpoint + `${id}`
  else URL = BASE_URL+ endpoint + `?` + new URLSearchParams(params);

  try {
    console.log(URL);
    const data = await fetch(URL, {
      method: "GET",
      headers: {
        // Authorization: "Bearer " + auth,
      },
      credentials: "include",
    });

    const res = await data.json();
    return res;
  } catch (e) {
    
    console.error("Error", e);
  }
}


export async function putData(url?: string, payload?: any, id?: string | number, afterUrl?:string) {
  try {
    console.log(id);
    if (id != undefined) url = `/${url}` + `/${id}`
    if (afterUrl != undefined) url = url + `/${afterUrl}`

    const URL = BASE_URL+ url
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        // Authorization: "Bearer " + auth,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const resData = await response.json();
    return resData;
  } catch (e) {
    console.error("Error", e);
  }
}

export async function patchData(endpoint?: any, params?: any, id?: string | string[], payload ?: any) {
  let URL;

  if (id != undefined) URL = BASE_URL+ endpoint + `${id}`
  else URL = BASE_URL+ endpoint + `?` + new URLSearchParams(params);
  try {
    console.log(URL);
    const data = await fetch(URL, {
      method: "PATCH",
      headers: {
        // Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const res = await data.json();
    return res;
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