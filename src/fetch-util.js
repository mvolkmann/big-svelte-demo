import { taskEnd, taskStart } from './spinner';

const SERVER_URL = 'http://localhost:1919/';
const options = {
  headers: {
    //'Access-Control-Allow-Origin': SERVER_URL,
    'Access-Control-Allow-Origin': '*'
  }
};

export async function deleteResource(urlSuffix) {
  const url = getUrl(urlSuffix);
  const res = await fetch(url, { ...options, method: 'DELETE' });
}

export async function getJson(urlSuffix) {
  taskStart();
  try {
    const url = getUrl(urlSuffix);
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } finally {
    taskEnd();
  }
}

export function getQuery(obj) {
  return (
    '?' +
    Object.entries(obj)
      .map(([key, value]) => key + '=' + encodeURIComponent(value))
      .join('&')
  );
}

export async function getText(urlSuffix) {
  taskStart();
  try {
    const url = getUrl(urlSuffix);
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(await res.text());
    return res.text();
  } finally {
    taskEnd();
  }
}

const getUrl = urlSuffix =>
  String(urlSuffix).startsWith('http') ? urlSuffix : SERVER_URL + urlSuffix;

export function postJson(urlSuffix, obj) {
  return postPutJson('POST', urlSuffix, obj);
}

export function putJson(urlSuffix, obj) {
  return postPutJson('PUT', urlSuffix, obj);
}

async function postPutJson(method, urlSuffix, obj) {
  taskStart();
  try {
    const body = JSON.stringify(obj);
    const headers = {
      'Content-Length': body.length,
      'Content-Type': 'application/json',
      ...options.headers
    };
    const opts = {
      ...options,
      method,
      headers,
      body
    };
    const url = getUrl(urlSuffix);
    const res = await fetch(url, opts);

    // We are not checking res.ok here because some callers
    // want to get an error message from the JSON response body.
    //if (!res.ok) throw new Error(await res.text());

    return res.json();
  } finally {
    taskEnd();
  }
}
