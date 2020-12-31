import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import Toolbar from "./components/toolbar/toolbar";

import boom from "./media/boom.wav";
import clap from "./media/clap.wav";
import hihat from "./media/hihat.wav";
import kick from "./media/kick.wav";
import openhat from "./media/openhat.wav";
import ride from "./media/ride.wav";
import snare from "./media/snare.wav";
import tink from "./media/tink.wav";
import tom from "./media/tom.wav";

function App() {
  // const [playing, setPlaying] = useState("");
  const keyRef = useRef([]);
  keyRef.current = [];

  const SoundButton = () => {
    const soundsArray = [
      {
        id: "KeyQ",
        key: "Q",
        name: "BOOM",
        src: boom,
        letter: "Q",
      },
      { id: "KeyW", key: "W", name: "CLAP", src: clap, letter: "W" },
      { id: "KeyE", key: "E", name: "HIHAT", src: hihat, letter: "E" },
      { id: "KeyA", key: "A", name: "KICK", src: kick, letter: "A" },
      {
        id: "KeyS",
        key: "S",
        name: "OPENHAT",
        src: openhat,
        letter: "S",
      },
      { id: "KeyD", key: "D", name: "RIDE", src: ride, letter: "D" },
      { id: "KeyZ", key: "Z", name: "SNARE", src: snare, letter: "Z" },
      { id: "KeyX", key: "X", name: "TINK", src: tink, letter: "X" },
      { id: "KeyC", key: "C", name: "TOM", src: tom, letter: "C" },
    ];

    const playSound = (e) => {
      const sound = document.querySelector(`audio[id="${e.code}"]`); //select audio based off of use keyboard input ${e.code}
      if (!sound) return; //doesnt play anything if associated letter is not pressed
      sound.currentTime = 0; //starts sound over
      sound.play();
      console.log(e.code);
    };
    const playAnimation = (e) => {
      const animation = document.querySelector(`.key[id="${e.code}"]`);
      if (!animation) return;
      animation.classList.add("playing"); //adds the css playing to divs key
    };
    const stopAnimation = (e) => {
      const animation = document.querySelector(`.key[id="${e.code}"]`);
      if (!animation) return;
      animation.classList.remove("playing");
    };
    // window.addEventListener("keydown", playSound);
    // window.addEventListener("keydown", playAnimation);
    // window.addEventListener("keyup", stopAnimation);

    useEffect(() => {
      window.addEventListener("keydown", playSound);
      window.addEventListener("keydown", playAnimation);
      window.addEventListener("keyup", stopAnimation);
    });

    //needed to control each ref
    const addToRef = (el) => {
      //console.log(el);
    };

    const handleClick = (e) => {
      let clickSound = document.querySelector(
        `audio[id=${e.currentTarget.id}]` //audio selected based off of where the user clicked
      );
      //console.log(e.currentTarget.id); //logs the value of div id clicked

      clickSound.currentTime = 0;
      clickSound.play();

      // keyRef.current.classList.add("playing");
      addToRef(e.currentTarget.classList.add("playing"));
      //setPlaying("playing");

      // const clickAnimation = document.querySelector(
      //   `.key[id=${e.currentTarget.id}]`
      // );
      //clickAnimation.classList.add("playing");
    };

    const clickStopAnimation = (e) => {
      // const clickAnimation = document.querySelector(
      //   `.key[id=${e.currentTarget.id}]`
      //);
      //clickAnimation.classList.remove("playing");
      //setPlaying("");
      //keyRef.current.classList.remove("playing");
      addToRef(e.currentTarget.classList.remove("playing"));
    };

    return (
      <div className="container">
        {soundsArray.map((soundsId) => (
          <div
            className="key"
            ref={addToRef}
            key={soundsId.key}
            id={soundsId.id}
            onMouseDown={handleClick}
            onMouseUp={clickStopAnimation}
          >
            <kbd>{soundsId.letter}</kbd>
            <span className="sound">{soundsId.name}</span>
            <audio id={soundsId.id} src={soundsId.src}></audio>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <Toolbar />
      <SoundButton />
    </div>
  );
}

export default App;
