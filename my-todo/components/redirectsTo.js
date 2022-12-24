import { useRouter } from "next/router"


const RedirectTo = ({path}) => {
  console.log(path);
  let router=useRouter();
  router.push(path)
  return;
}

export default RedirectTo