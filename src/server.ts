import app from "./app";

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`\r\nAPP_ON ---> Acessar via: http://localhost:${port}`);
});
