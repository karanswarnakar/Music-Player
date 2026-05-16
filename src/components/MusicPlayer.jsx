import React, { useEffect, useRef, useState } from "react";

export default function MusicControls() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(83);
  const [duration, setDuration] = useState(225);

  // Format time
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Play / Pause
  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const loaded = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loaded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loaded);
    };
  }, []);

  // Seek functionality
  const handleSeek = (e) => {
    const seekBar = e.currentTarget;

    const rect = seekBar.getBoundingClientRect();

    const percent = (e.clientX - rect.left) / rect.width;

    const seekTime = percent * duration;

    audioRef.current.currentTime = seekTime;

    setCurrentTime(seekTime);
  };

  const progressWidth = `${(currentTime / duration) * 100}%`;

  return (
    <div className="music-wrapper">
      <div className="player-ui">

        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />

        <div className="seekBarContainer">

          <div className="seekBar" onClick={handleSeek}>
            <div
              className="seekProgress"
              style={{ width: progressWidth }}
            ></div>
          </div>

          <div className="timeDisplay">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

        </div>

        <div className="playerControls">

          <button className="controlBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="black"
            >
              <polygon points="11 19 2 12 11 5 11 19"></polygon>
              <polygon points="22 19 13 12 22 5 22 19"></polygon>
            </svg>
          </button>

          <button className="playBtn" onClick={togglePlay}>

            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="black"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="black"
              >
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
            )}

          </button>

          <button className="controlBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="black"
            >
              <polygon points="13 19 22 12 13 5 13 19"></polygon>
              <polygon points="2 19 11 12 2 5 2 19"></polygon>
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}