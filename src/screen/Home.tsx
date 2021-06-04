import { isLoggedInVar } from "../apollo";
import { darkModeVar } from "../apollo";
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <button onClick={() => isLoggedInVar(false)}>Log out now!</button>
      </div>
      <div>
        <button onClick={() => darkModeVar(true)}>To dark</button>
        <button onClick={() => darkModeVar(false)}>To light</button>
      </div>
    </div>
  );
}
export default Home;