import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      Home
      <ul>
        <Link to={"login"}>Login</Link>
        <Link to={"register"}>Register</Link>
      </ul>
    </div>
  );
}
//  <Link to={pathname} className="ml-3 text-sm font-medium">
//             {text}
//           </Link>
