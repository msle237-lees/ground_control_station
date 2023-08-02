var test = "Hello";
window.makePostRequest = async function (test) {
    window.api.sendPostRequest('http://127.0.0.1:5000/test', test)
    .then(data => console.log(data))
    .catch(error => console.error(error));
}