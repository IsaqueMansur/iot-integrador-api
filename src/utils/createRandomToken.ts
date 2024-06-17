export default function createRandomToken() {
  const token = `${Math.random() * 10}_${new Date().getTime()}`;
  return token;
}
