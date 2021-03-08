const fs = require('fs');
const server = require('http');
const superagent = require('superagent');

/***** Callback Hell *****/
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(
//       `https://dog.ceo/api/breed/${data}/images/random
//   `
//     )
//     .end((err, res) => {
//       console.log(res.body);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log(`Fetched a random dog image for the breed ${data}`);
//       });
//     });
// });

/***** Promises *****/
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('I could not find that file');
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      if (err) {
        reject('I could not write to that file');
      }
      resolve('success');
    });
  });
};

(async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random image saved to the file');
  } catch (err) {
    console.log(err.message);
  }
})();

/* Server Code */
fs.readFile(`${__dirname}/dog-img.txt`, (err, data) => {
  server
    .createServer((req, res) => {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(`
            <img src="${data}" width="500" height="500" />
        `);
    })
    .listen(8000, () => {
      console.log('Listening for request on port 8000...');
    });
});
