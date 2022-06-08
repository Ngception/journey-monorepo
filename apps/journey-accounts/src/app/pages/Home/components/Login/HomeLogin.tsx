import { Icon } from '@journey-monorepo/ui';
import { FC, FormEvent, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeLoginProps {}

export const HomeLogin: FC<HomeLoginProps> = (props: HomeLoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitButtonClasses = `button is-primary ${
    isLoading ? 'is-loading' : undefined
  }`;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                aria-required="true"
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="icon is-small is-left">
                <Icon type="solid" name="envelope" />
              </span>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <input
                className="input"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                aria-required="true"
                onChange={(event) => setPassword(event?.target.value)}
              />
              <span className="icon is-small is-left">
                <Icon type="solid" name="lock" />
              </span>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                aria-label={
                  isPasswordVisible ? 'Hide Password' : 'Show password'
                }
              >
                <Icon
                  type="solid"
                  name={!isPasswordVisible ? 'eye' : 'eye-slash'}
                />
              </button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className="field">
            <div className="control">
              <button
                data-testid="submit-button"
                disabled={!email || !password || isLoading}
                type="submit"
                className={submitButtonClasses}
              >
                Login
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
