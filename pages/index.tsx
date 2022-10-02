import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { skeleton } from "../util/skeleton";
import styles from "../styles/Home.module.css";

const SHEET_ID = `173-N1JPfWFWx6--0_KwxknkyAdIk_J-2ad4uHApdxPw`;

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numFriends, setNumFriends] = useState(0);
  const [isDooting, setIsDooting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);

  useEffect(() => {
    const before =
      typeof localStorage === "undefined"
        ? false
        : !!localStorage.getItem("submitted");
    setHasSubmittedBefore(before);
    if (before) {
      setHasSubmittedBefore(true);
      setHasSubmitted(true);
    }
  }, []);

  const handleDoot: React.MouseEventHandler = useCallback(
    (ev) => {
      if (isDooting) return;
      const audio = ev.currentTarget.querySelector("audio");
      setIsDooting(true);
      setTimeout(() => {
        audio?.play();
      }, 400);
      setTimeout(() => {
        setIsDooting(false);
      }, 1400);
    },
    [isDooting]
  );

  const handleSubmit: React.FormEventHandler = useCallback(
    async (ev) => {
      ev.preventDefault();
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/rsvp", {
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          method: "POST",
          body: JSON.stringify({ name, email, numFriends }),
        } as any);
        const body = await res.json();
        if (!res.ok) {
          throw new Error(body.error || "Unknown error");
        }
        setHasSubmitted(true);
        localStorage.setItem("submitted", "yes");
      } catch (err) {
        console.error(err);
        alert("dang, your rsvp was too spooky! didnt work");
      }
      setIsSubmitting(false);
    },
    [name, email, numFriends]
  );

  const handleReset = useCallback(() => {
    setHasSubmitted(false);
    setHasSubmittedBefore(false);
  }, []);

  useEffect(() => {
    const styles = `background: #000; color: #fff; font-size: 12px; line-height: 12px;`;

    console.log(`%c${skeleton}`, styles);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>welcome... TO UR DOOM!!11!1</title>
        <meta
          name="description"
          content="you are invited to the sp00ki3st event of the season! hav e a nice FRIGHT! got em"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          welcome....
          <br />
          <Image
            src="/images/doom.gif"
            alt="TO YOUR DOOM!!!!"
            width={598}
            height={93}
          />
        </h1>
        <p className={styles.intro}>
          you are invited to a spooktacular rager on{" "}
          <strong>october 29th, 2021</strong> located at{" "}
          <strong>3001 cherrywood road</strong>
          <br />
          <a href="#rsvp">
            (take me to the rsvp i am a geneous and already know everything)
          </a>
        </p>

        <p className={styles.refreshments}>
          there will be <strong>POISONOUS</strong> drinks and{" "}
          <strong>ROTTEN</strong> snacks
        </p>
        <div className={styles.images}>
          <Image
            src="/images/skeleton-6.gif"
            alt="skeleton"
            width={400}
            height={400}
          />
          <Image
            src="/images/skeleton-7.gif"
            alt="skeleton"
            width={369}
            height={480}
          />
        </div>

        <p className={styles.dancing}>
          hope you wear your dancing <strong>BOO</strong>ts because we will be{" "}
          <strong>HAUNT</strong>ing the dance floor all night long
        </p>
        <div className={styles.images}>
          <Image
            src="/images/skeleton-1.gif"
            alt="skeleton"
            width={400}
            height={300}
          />
          <Image
            src="/images/pumpkin-dance.gif"
            alt="skeleton"
            width={320}
            height={240}
          />
          <Image
            src="/images/skeleton-2.gif"
            alt="skeleton"
            width={300}
            height={300}
          />
        </div>

        <p className={styles.costumes}>
          costumes are not only encouraged, but mandatory!!!! those without
          costumes will be <strong>SPOOKED</strong> to <strong>DEATH</strong>
        </p>
        <div className={styles.images}>
          <Image
            src="/images/dracula.gif"
            alt="dracula"
            width={318}
            height={350}
          />
          <Image
            src="/images/skeleton-5.gif"
            alt="skeleton"
            width={1000}
            height={1080}
          />
          <Image
            src="/images/pumpkin-1.gif"
            alt="witch"
            width={240}
            height={240}
          />
        </div>

        <div className={styles.hosts}>
          <p>brought to you by your CURSED hosts</p>
          <div>
            <div>
              <Image
                src="/images/name-will.gif"
                width={127}
                height={63}
                alt="Will"
              />
            </div>
            <div>
              <Image
                src="/images/name-dale.gif"
                width={156}
                height={63}
                alt="Dale"
              />
            </div>
            <div>
              <Image
                src="/images/name-caitlin.gif"
                width={168}
                height={54}
                alt="Caitlin"
              />
            </div>
          </div>
        </div>

        <p id="rsvp" className={styles.rsvpTitle}>
          do you still <strong>DARE</strong> to enter?
          <br />
          <small>pls rsvp below</small>
        </p>
        {hasSubmitted ? (
          <div className={styles.congrats}>
            <h2>
              {hasSubmittedBefore
                ? "jk you already did this dude"
                : "good job see you there"}
            </h2>

            {hasSubmittedBefore && (
              <div>
                <button onClick={handleReset}>do it again lol</button>
              </div>
            )}
            <div className={styles.images}>
              <Image
                src="/images/skeleton-9.gif"
                width={540}
                height={540}
                alt="skeleton"
              />
              <Image
                src="/images/skeleton-3.gif"
                width={342}
                height={196}
                alt="skeleton"
              />
              <Image
                src="/images/skeleton-9.gif"
                width={540}
                height={540}
                alt="skeleton"
              />
            </div>
          </div>
        ) : (
          <div className={styles.rsvp}>
            <div className={styles.tombstoneTop}>
              <Image
                style={{ display: "block" }}
                src="/images/tombstone-top.png"
                width={3800}
                height={652}
                alt=""
              />
            </div>
            <form className={styles.rsvpForm} onSubmit={handleSubmit}>
              <label>
                <div>rip here lies</div>
                <input
                  name="name"
                  placeholder="(ur name)"
                  value={name}
                  onChange={(ev) => setName(ev.currentTarget.value)}
                  disabled={isSubmitting}
                />
              </label>
              <label>
                <div>
                  who is bringing this many ghouls (friends) to the party
                </div>
                <div className={styles.slider}>
                  <input
                    name="numFriends"
                    type="range"
                    min="0"
                    max="100"
                    value={numFriends}
                    onChange={(ev) =>
                      setNumFriends(parseInt(ev.currentTarget.value, 10))
                    }
                    disabled={isSubmitting}
                  />
                  <span
                    className={clsx(
                      styles.numFriends,
                      numFriends > 2 && styles.smallFriends,
                      numFriends > 10 && styles.mediumFriends,
                      numFriends > 20 && styles.bigFriends,
                      numFriends > 50 && styles.hugeFriends,
                      numFriends > 90 && styles.gigaFriends
                    )}
                  >
                    {numFriends}
                  </span>
                </div>
              </label>
              <label>
                <div>
                  and can be reached from beyond the grave at this email address
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="ur email"
                  value={email}
                  onChange={(ev) => setEmail(ev.currentTarget.value)}
                  disabled={isSubmitting}
                />
              </label>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "sending to afterlife..."
                  : "rsvp / rip in peace"}
              </button>
            </form>
            <div className={styles.tombstoneBottom}>
              <Image
                style={{ display: "block" }}
                src="/images/tombstone-bottom.png"
                width={3800}
                height={652}
                alt=""
              />
            </div>
          </div>
        )}
      </main>
      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((pos) => (
        <button
          key={pos}
          className={clsx(styles.doot, styles[pos])}
          onClick={handleDoot}
        >
          {!isDooting && (
            <Image
              src="/images/doot.png"
              width={276}
              height={249}
              alt="honka"
            />
          )}
          {isDooting && (
            <Image
              src="/images/doot.gif"
              width={276}
              height={249}
              alt="honka"
            />
          )}
          <audio src="/sounds/doot.mp3" />
        </button>
      ))}
    </div>
  );
};

export default Home;
