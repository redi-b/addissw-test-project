import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormCard,
  FormIcon,
  FormError,
  FormFooter,
} from "@/components/Form";
import { Link, useNavigate } from "react-router";
import { LoaderCircle, LogIn } from "lucide-react";
import { css } from "@emotion/react";
import { useAuth } from "@/contexts/AuthContext";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!username || !password) {
      setErrors(["Please enter both username and password."]);
      setLoading(false);
      return;
    }
    setErrors([]);
    try {
      await login(username, password);

      navigate("/");
    } catch (err: any) {
      const response = err.response;

      if (response?.errors) {
        const messages = response.errors.map((e: any) => e.message);
        setErrors(messages);
      } else if (response?.message) {
        setErrors([response.message]);
      } else {
        setErrors(["Login failed. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard>
      <FormIcon>
        <LogIn />
      </FormIcon>
      <Form
        onSubmit={handleSubmit}
        css={css`
          width: 100%;
        `}
      >
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        {errors.length > 0 && (
          <div>
            {errors.map((msg, idx) => (
              <FormError key={idx}>{msg}</FormError>
            ))}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle size={16} className="animate-spin" />}
          <span>{loading ? "Signing in..." : "Sign in"}</span>
        </Button>

        <FormFooter>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </FormFooter>
      </Form>
    </FormCard>
  );
};

export default SigninPage;
