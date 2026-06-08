import { useCallback, useEffect, useState, useRef, useContext } from "react";
import { ThemeContext } from './context/ThemeContext';

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [symbolsAllowed, setSymbolsAllowed] = useState(true);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const passwordInputRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordInputRef.current?.select();

    window.navigator.clipboard.writeText(password);
  }, [password]);

  const createPassword = useCallback(() => {
    if (
      !uppercaseAllowed &&
      !lowercaseAllowed &&
      !numbersAllowed &&
      !symbolsAllowed
    ) {
      setPassword("");
      alert("BANG!!! 🔫");
      return "";
    }

    let pass = "";
    let str = "";
    let selected_length = 0;
    let selected_char = "";
    if (uppercaseAllowed) {
      let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      str += upper;
      selected_char += upper.charAt(Math.floor(Math.random() * upper.length));
      selected_length += 1;
    }
    if (lowercaseAllowed) {
      let lower = "abcdefghijklmnopqrstuvwxyz";
      str += lower;
      selected_char += lower.charAt(Math.floor(Math.random() * lower.length));
      selected_length += 1;
    }
    if (numbersAllowed) {
      let num = "0123456789";
      str += num;
      selected_char += num.charAt(Math.floor(Math.random() * num.length));
      selected_length += 1;
    }
    if (symbolsAllowed) {
      let symbols = "{}[];,:.<>?`~!@#$%^&*()-_+=";
      str += symbols;
      selected_char += symbols.charAt(
        Math.floor(Math.random() * symbols.length),
      );
      selected_length += 1;
    }

    for (let i = 0; i < length - selected_length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    pass = selected_char + pass;

    const passwordArr = [...pass];
    for (let i = passwordArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArr[i], passwordArr[j]] = [passwordArr[j], passwordArr[i]];
    }

    setPassword(passwordArr.join(""));
  }, [
    length,
    uppercaseAllowed,
    lowercaseAllowed,
    numbersAllowed,
    symbolsAllowed,
    setPassword,
  ]);

  useEffect(() => {
    createPassword();
  }, [createPassword]);

  return (
    <div style={{
        padding: '130px',
    }}>
      <h1 style={{
        color: theme === 'dark' ? '#fff' : '#000'
      }}>Password Generator</h1>
      <input
        type="text"
        id="password"
        value={password}
        ref={passwordInputRef}
        readOnly
      />{" "}
      <button
        type="button"
        style={{
          backgroundColor: theme === 'light' ? '#333' : '#fff',
          color: theme === 'light' ? '#fff' : '#333',
          border: "0px",
          borderRadius: "15%",
          padding: "7px",
          marginLeft: "10px",
        }}
        onClick={copyPasswordToClipboard}
      >
        Copy
      </button>
      <div>
        <input
          type="range"
          name="length"
          min={8}
          max={45}
          value={length}
          onChange={(e) => {
            setLength(parseInt(e.target.value));
          }}
        />{" "}
        <label htmlFor="length" style={{
            color: theme === 'dark' ? '#fff' : '#000'
        }}>Length ({length})</label> <br />
        <input
          type="checkbox"
          name="uppercase"
          defaultChecked={uppercaseAllowed}
          onChange={() => {
            setUppercaseAllowed((prev) => !prev);
          }}
        />{" "}
        <label htmlFor="uppercase" style={{
            color: theme === 'dark' ? '#fff' : '#000'
        }}>Uppercase</label> <br />
        <input
          type="checkbox"
          name="lowercase"
          defaultChecked={lowercaseAllowed}
          onChange={() => {
            setLowercaseAllowed((prev) => !prev);
          }}
        />{" "}
        <label htmlFor="lowercase" style={{
            color: theme === 'dark' ? '#fff' : '#000'
        }}>Lowercase</label> <br />
        <input
          type="checkbox"
          name="numbers"
          defaultChecked={numbersAllowed}
          onChange={() => {
            setNumbersAllowed((prev) => !prev);
          }}
        />{" "}
        <label htmlFor="numbers" style={{
            color: theme === 'dark' ? '#fff' : '#000'
        }}>Numbers</label> <br />
        <input
          type="checkbox"
          name="symbols"
          defaultChecked={symbolsAllowed}
          onChange={() => {
            setSymbolsAllowed((prev) => !prev);
          }}
        />{" "}
        <label htmlFor="symbols" style={{
            color: theme === 'dark' ? '#fff' : '#000'
        }}>Symbols</label> <br />
      </div>
      <br />
      <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '10px 20px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        borderRadius: '15px',
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
    </div>
  );
}

export default PasswordGenerator;
