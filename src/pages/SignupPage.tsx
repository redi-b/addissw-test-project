import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormCard,
  FormIcon,
  FormFooter,
  FormError,
} from "@/components/Form";
import { Link } from "react-router";
import { LoaderCircle, UserPlus } from "lucide-react";
import { css } from "@emotion/react";
import { signUp } from "@/api/auth";
import { toast } from "sonner";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!username || !password || !confirmPassword) {
      setErrors(["Please enter both username and password."]);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrors(["Passwords do not match."]);
      setLoading(false);
      return;
    }
    setErrors([]);

    try {
      const data = await signUp(username, password);

      if (!data) {
        setErrors(["Signup failed! Please try again."]);
      }

      toast.success("Signup successful! You can now log in.");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const response = err.response;

      if (response?.errors) {
        const messages = response.errors.map((e: any) => e.message);
        setErrors(messages);
      } else if (response?.message) {
        setErrors([response.message]);
      } else {
        setErrors(["Signup failed. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard>
      <FormIcon>
        <UserPlus />
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

        <FormGroup>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <span>{loading ? "Signing up..." : "Sign up"}</span>
        </Button>

        <FormFooter>
          Already have an account? <Link to="/signin">Sign in</Link>
        </FormFooter>
      </Form>
    </FormCard>
  );
};

export default SignupPage;
