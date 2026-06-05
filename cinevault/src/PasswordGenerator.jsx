import { useCallback, useEffect, useState, useRef } from "react";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [symbolsAllowed, setSymbolsAllowed] = useState(true);

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
    <div>
      <h1>Password Generator</h1>
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
          backgroundColor: "black",
          color: "white",
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
        Length ({length}) <br />
        <input
          type="checkbox"
          name="uppercase"
          defaultChecked={uppercaseAllowed}
          onChange={() => {
            setUppercaseAllowed((prev) => !prev);
          }}
        />{" "}
        Uppercase <br />
        <input
          type="checkbox"
          name="lowercase"
          defaultChecked={lowercaseAllowed}
          onChange={() => {
            setLowercaseAllowed((prev) => !prev);
          }}
        />{" "}
        Lowercase <br />
        <input
          type="checkbox"
          name="numbers"
          defaultChecked={numbersAllowed}
          onChange={() => {
            setNumbersAllowed((prev) => !prev);
          }}
        />{" "}
        Numbers <br />
        <input
          type="checkbox"
          name="symbols"
          defaultChecked={symbolsAllowed}
          onChange={() => {
            setSymbolsAllowed((prev) => !prev);
          }}
        />{" "}
        Symbols <br />
      </div>
    </div>
  );
}

export default PasswordGenerator;
