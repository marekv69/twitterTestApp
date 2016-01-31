/***
 * This function performs AJAX get request using ES6 Promise
 *
 * @param url url of get request
 * @returns {Promise} ES6 promise for the request
 */
export default function ajaxGet(url) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error("Network error when communicating with the backend"));
    };
    req.send();
  });
}
