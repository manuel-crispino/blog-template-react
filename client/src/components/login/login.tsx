import { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface Props {
  postForm: () => void;
  isAdmin: (admin: number | undefined) => void;
  isUser: (user: number | undefined) => void;
  closeLoginForm: () => void;
}

interface ServerData {
  id: number;
  email: string;
  role: string;
  csrfToken: string;
  success: boolean;
}

export default function Login(props: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [csrfToken, setToken] = useState<string>("");
  const [isPasswordVisible, setIsVisible] = useState<boolean>(false);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [loginError, setLoginError] = useState<string>("");

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setEmail(newValue);
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setPassword(newValue);
  }

  async function handleToken() {
    try {
      const response = await fetch("/csrfToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const csrfToken = await response.json();
        setToken(csrfToken);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await handleToken();
    console.log("button submit login clicked ");
    const data = {
      email: email,
      password: password,
      csrfToken: csrfToken,
    };
    try {
      const loginResponse = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (loginResponse.ok) {
        const responseData = await loginResponse.json();
        setServerData({
          id: responseData.id,
          email: responseData.email,
          role: responseData.role,
          csrfToken: responseData.csrfToken,
          success: responseData.success,
        });
      } else {
        console.log(data, " !== ", serverData);
        alert("email or password incorrect  ");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (serverData) {
      if (serverData.success) {
        props.postForm();
        if (serverData.role === "admin") {
          alert(" Welcome Admin! You have successfully logged in.");
          props.isAdmin(serverData.id);
        } else {
          alert(" Welcome User! You have successfully logged in.");
          props.isUser(serverData.id);
        }
        setEmail("");
        setPassword("");
      } else {
        setLoginError("Email or password incorrect. Please try again.");
      }
    }
  }, [serverData, props]);

  return (
    <div className="overlay">
      <div className="login-form">
        <button
          type="button"
          title="exit"
          className="float-right-cross"
          onClick={() => props.closeLoginForm()}
        >
          X
        </button>
        <form id="login-form" action="post" onSubmit={handleSubmit}>
          <ul id="ul-no-style">
            <li>
              <h2>Login</h2>
            </li>
            <li>
              <input
                id="email-input"
                type="email"
                onChange={handleEmail}
                placeholder="email@gmail.com"
                value={email}
              />
            </li>
            <li>
              <input
                id="password-input"
                type={isPasswordVisible ? "text" : "password"}
                onChange={handlePassword}
                placeholder="password"
                autoComplete="current-password"
                value={password}
              />
            </li>
            <li className="margin-top-1">
              <label htmlFor="showPassword">Show password</label>
              <input
                id="showPassword"
                type="checkbox"
                name="showPassword"
                aria-label="Show Password"
                onChange={() => setIsVisible(!isPasswordVisible)}
              />
            </li>
            <li>
              <input type="hidden" value={csrfToken} />
            </li>
            <li>
              <button className="margin-top-2" type="submit">
                Submit
              </button>
            </li>
          </ul>
        </form>
        {loginError && <p className="error-message">{loginError}</p>}
      </div>
    </div>
  );
}
