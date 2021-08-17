const Amotion = require('../dist');

const app = new Amotion();

app.router.add('GET', '/status', () => {

})

app.run(3000).then(() => {
  console.log('App running...');
});
