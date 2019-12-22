const SERVER_URL = 'http://localhost:1919';

export async function createDog(dog) {
  const body = JSON.stringify(dog);
  const headers = {
    'Content-Length': body.length,
    'Content-Type': 'application/json'
  };
  const res = await fetch(SERVER_URL, {
    method: 'POST',
    headers,
    body
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // the new dog with id property
}

export async function getDogs() {
  const res = await fetch(SERVER_URL);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // the dogs
}

export async function getDog(id) {
  const res = await fetch(SERVER_URL + '/' + id);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // the dog
}

export async function updateDog(dog) {
  const body = JSON.stringify(dog);
  const headers = {
    'Content-Length': body.length,
    'Content-Type': 'application/json'
  };
  const res = await fetch(SERVER_URL + '/' + dog.id, {
    method: 'PUT',
    headers,
    body
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // the updated dog
}

export async function deleteDog(id) {
  const res = await fetch(SERVER_URL + '/' + id, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(await res.text());
}
