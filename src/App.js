import "./App.css";

import React, { useState, useEffect } from "react";
let ssu = new SpeechSynthesisUtterance();

let App = () => {
  let ssg = speechSynthesis.getVoices();

  let [joke, setJoke] = useState({});

  let [jokeExist, setJokeExist] = useState(false);

  let [show, setShow] = useState("");

  let getJoke = async () => {
    try {
      setShow("");
      let apiUrl = "https://v2.jokeapi.dev/joke/Any?type=twopart";

      let res = await fetch(apiUrl);

      let data = await res.json();

      setJoke(data);

      setJokeExist(!jokeExist);

      ssu.text = data.setup;

      speechSynthesis.speak(ssu);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  let showAns = () => {
    setShow("show");
    setJokeExist(!jokeExist);

    ssu.text = joke.delivery;

    speechSynthesis.speak(ssu);
  };

  function handleVoices(e) {
    ssu.voice = ssg.find((voice) => {
      return voice.name === e.target.value;
    });

    console.log(ssu.voice);

    speechSynthesis.speak(ssu);
  }

  useEffect(() => {
    getJoke();

    // eslint-disable-next-line
  }, []);

  console.log("'won't work on all browser");
  return (
    <div className="bot_container relative">
      <div className="joke">
        <h2 className="text-xl  font-bold">{joke.setup}</h2>
        <h3 className={show}> {joke.delivery}</h3>
      </div>

      <button className="font-bold" onClick={jokeExist ? showAns : getJoke}>
        {jokeExist ? "Show" : "New joke"}
      </button>
      <select
        className="block m-auto absolute left-0  top-0 right-0"
        onChange={handleVoices}
      >
        {ssg.map((voice, i) => {
          return (
            <option key={i} value={voice.name}>
              {voice.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default App;
