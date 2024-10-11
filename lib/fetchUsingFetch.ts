export default async function fetchUsingFetch(
  url: string,
  mode: string,
  body: any,
  bodyType: string
): Promise<any> {
  if(bodyType === "json") {
    body = JSON.stringify(body);
  } else if(bodyType === "form") {
    let formData = new FormData();
    for(let key in body) {
      formData.append(key, body[key]);
    }
    body = formData;
  }

  const res: any = await fetch(url, {
    method: mode,
    body: body,
    credentials: "include",
  })
  .catch((error) => error);

  if(res instanceof Error) {
    return { error: res.message };
  }

  let data = await res.json()
  .catch((error: any) => error);

  return data;
}
