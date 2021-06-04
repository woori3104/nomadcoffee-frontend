import { isLoggedInVar } from "../apollo";
import { darkModeVar } from "../apollo";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
      </div>
      <div>
        <button onClick={() => darkModeVar(true)}>To dark</button>
        <button onClick={() => darkModeVar(false)}>To light</button>
      </div>
    </div>
  );
}
export default Login;