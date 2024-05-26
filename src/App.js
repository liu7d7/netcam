import './App.css';
import hts from './/assets/hts.svg'
import Globe from 'react-globe.gl'
import {MeshPhongMaterial} from "three";
import {useEffect, useState} from "react";
import {ratio} from "fuzzball/lite";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Feed {
  lat;
  long;
  name;
  country;
  city;
  link;
  thumb;
  isHardcoded;

  constructor(lat, long, name, country, city, link, thumb, isHardcoded) {
    this.lat = parseFloat(lat);
    this.long = parseFloat(long);
    this.name = name.replace(" Cam", "").trim().split(" - ")[0];
    this.country = country;
    this.city = city;
    this.link = link;
    this.thumb = thumb;
    this.isHardcoded = parseInt(isHardcoded);
  }
}

let feeds = await (async () => {
  let a = (
    await fetch("/updated_database.csv")
      .then(res => res.text())
      .then(text => text.split("\n")
        .map(it => new Feed(...it.split(",")))));
  shuffleArray(a);
  return a;
})();

let sw16 = `#1a1c2c
#5d275d
#b13e53
#ef7d57
#ffcd75
#a7f070
#38b764
#257179
#29366f
#3b5dc9
#41a6f6
#73eff7
#f4f4f4
#94b0c2
#566c86
#333c57`.split("\n")

const colors = [
  ['#b13e53', '#5d275d'],
  ['#ef7d57', '#b13e53'],
  ['#ffcd75', '#ef7d57'],
  ['#a7f070', '#38b764'],
  ['#38b764', '#257179'],
  ['#3b5dc9', '#29366f'],
  ['#41a6f6', '#3b5dc9'],
  ['#73eff7', '#41a6f6'],
  ['#94b0c2', '#566c86'],
  ['#566c86', '#333c57']
]

// el.innerHTML = markerSVG.replace("rgb(32,196,203)", colors[d.color][0]).replace("rgb(27,167,173)", colors[d.color][1]);
const markerSVG = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="64" height="64" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
\t<circle cx="45" cy="45" r="45" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(32,196,203); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
\t<path d="M 70.843 38.067 l -7.986 2.157 l 0.911 -3.4 c 0.285 -1.065 -0.348 -2.168 -1.408 -2.452 L 24.975 24.355 c -1.06 -0.284 -2.16 0.355 -2.446 1.419 l -4.461 16.649 c -0.285 1.065 0.348 2.168 1.408 2.452 l 37.384 10.017 c 1.06 0.284 2.16 -0.355 2.445 -1.419 l 0.911 -3.4 l 5.838 5.861 c 0.883 0.886 2.392 0.478 2.717 -0.734 l 4.057 -15.14 C 73.153 38.849 72.05 37.741 70.843 38.067 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(27,167,173); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
\t<path d="M 20.728 71.826 c -1.657 0 -3 -1.343 -3 -3 V 53.179 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 15.647 C 23.728 70.483 22.385 71.826 20.728 71.826 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(27,167,173); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
\t<polygon points="35.36,64 20.98,64 20.98,58 30.75,58 35.52,39.98 41.32,41.51 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(27,167,173); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
\t<path d="M 73.957 34.953 L 65.97 37.11 l 0.911 -3.4 c 0.285 -1.065 -0.348 -2.168 -1.408 -2.452 L 28.089 21.241 c -1.06 -0.284 -2.16 0.355 -2.446 1.419 l -4.461 16.649 c -0.285 1.065 0.348 2.168 1.408 2.452 l 37.384 10.017 c 1.06 0.284 2.16 -0.355 2.445 -1.419 l 0.911 -3.4 l 5.838 5.861 c 0.883 0.886 2.392 0.478 2.717 -0.734 l 4.057 -15.14 C 76.267 35.735 75.164 34.627 73.957 34.953 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
\t<path d="M 23.842 68.713 c -1.657 0 -3 -1.343 -3 -3 V 50.064 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 15.648 C 26.842 67.37 25.499 68.713 23.842 68.713 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
\t<polygon points="38.48,60.89 24.1,60.89 24.1,54.89 33.86,54.89 38.63,36.86 44.43,38.4 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
</g>
</svg>`

let pointData = feeds.map(it => ({
  lat: it.lat,
  lng: it.long,
  size: 0.333,
  color: Math.floor(Math.random() * colors.length),
  feed: it
}))

function Search(props) {
  const [sortedFeeds, setSortedFeeds] = useState([]);

  return (
    <div className={"w-1/4 p-6"}>
      <div
        className={"bg-white w-full rounded-2xl shadow-2xl shadow-[#1a1c2c] p-4"}>
        <img src={hts} alt={"yoman"}
             className={"h-20 drop-shadow shadow-black"}/>
        <div className={"pt-2"}/>
        <div className={"sf-ui-reg text-md"}>
          About us <span
          className="fa-solid fa-arrow-up-right-from-square scale-75 place-content-center text-blue-600 hover:text-blue-500 hover:underline hover:cursor-pointer"
          onClick={() => {
            props.setScreen(2)
          }}/>
        </div>
        <span className={"sf-ui-reg text-md"}>
          How to add a camera <span
          className="fa-solid fa-arrow-up-right-from-square scale-75 place-content-center text-blue-600 hover:text-blue-500 hover:underline hover:cursor-pointer"
          onClick={() => {
            props.setScreen(3)
          }}/>
        </span>
        <div className={"pt-4"}/>
        <div
          className={"h-8 flex flex-row place-items-center w-max gap-2 sf-ui-reg"}>
          <div className={"h-max"}>
            <i className="fa-solid fa-magnifying-glass"/>
          </div>
          <textarea
            onChange={text => {
              let fw = feeds.map(it => {
                return {
                  rat: Math.max(ratio(text.target.value, it.name), ratio(text.target.value, it.country)),
                  original: it
                }
              })

              setSortedFeeds(fw.sort((lhs, rhs) => rhs.rat - lhs.rat).map(it => it.original))
            }}
            className={"bg-slate-200 rounded-lg resize-none p-1 h-full"}/>
        </div>
      </div>
      {sortedFeeds.length !== 0 &&
        <div
          className={"h-full flex flex-col gap-6 overflow-y-scroll overflow-x-visible mt-6 pl-20 -ml-20 pr-20 -mr-20 "}>
          {sortedFeeds.map(it => <Rec feed={it} setScreen={props.setScreen}
                                      setFeed={props.setFeed}/>)}
        </div>}
      {sortedFeeds.length === 0 &&
        <div
          className={"flex flex-col vt-thing place-content-center shadow-2xl shadow-[#1a1c2c] sf-ui-bold w-full bg-white rounded-2xl mt-6"}>
          <div
            className={" w-full text-center text-2xl text-slate-600"}>Searches
            appear here...
          </div>
        </div>
      }
    </div>
  )
}

function Earth(props) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function doIt() {
      setWidth(window.innerWidth * 0.5)
    }

    doIt();

    window.addEventListener("resize", doIt)
  }, []);

  return (
    <div
      className={"w-1/2 rounded-2xl overflow-clip mt-6 mb-6 shadow-2xl shadow-[#1a1c2c] bg-transparent"}>
      <Globe id={"hello"} globeMaterial={(() => {
        let a = new MeshPhongMaterial();
        a.bumpScale = 20;
        return a;
      })()}
             htmlElementsData={pointData}
             htmlElement={d => {
               const el = document.createElement('div');
               el.innerHTML = markerSVG.replaceAll("rgb(32,196,203)", colors[d.color][0]).replaceAll("rgb(27,167,173)", colors[d.color][1]);
               el.style.width = `3px`;

               el.style['pointer-events'] = 'auto';
               el.style.cursor = 'pointer';
               el.style.filter = 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.3)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.15))'
               el.onclick = () => actOnFeed({
                 ...props,
                 setFeed: props.setFeed,
                 feed: d.feed
               })
               return el;
             }}
             globeImageUrl={"./8081_earthmap4k.jpg"}
             bumpImageUrl={"./8081_earthbump4k.png"}
             backgroundImageUrl={"./night-sky.png"}
             backgroundColor={"#ffffff"} width={width}
             pointColor="color"
             pointAltitude={0.16}
             pointRadius={0.5}
             key={width.toString()}
             showGlobe={true} waitForGlobeReady={true}/>
    </div>
  )
}

function actOnFeed(props) {
  if (props.feed.isHardcoded) {
    props.setScreen(1)
    props.setFeed(props.feed)
  } else {
    window.open(props.feed.link, "").focus()
  }
}

function Rec(props) {
  console.log(props.hz)
  return (
    <div
      className={`bg-white ${props.hz ? 'hz-thing max-h-full' : 'w-full h-1/4'} flex-row flex rounded-2xl shadow-2xl shadow-[#1a1c2c]`}>
      <div className={"h-full w-1/2 p-4 flex flex-col"}>
        <div
          className={"sf-ui-bold text-3xl mr-4 overflow-clip"}>
          {props.feed.name} <span
          className="fa-solid fa-arrow-up-right-from-square scale-75 place-content-center text-blue-600 hover:text-blue-500 hover:underline hover:cursor-pointer"
          onClick={() => {
            actOnFeed(props)
          }}/>
        </div>
        <img
          src={props.feed.thumb}
          alt={""}
          className={"w-full mt-4 h-full object-cover object-center rounded-2xl"}/>
      </div>
      <div className={"overflow-y-scroll pr-4 mt-4 mb-4 sf-ui-reg w-1/2"}>
        {props.feed.name}<br/>
        Latitude: {props.feed.lat.toPrecision(6)}<br/>
        Longitude: {props.feed.long.toPrecision(6)}<br/>
        In {props.feed.city}, {props.feed.country}
      </div>
    </div>
  )
}

function Recs(props) {
  return (
    <div className={"w-1/4"}>
      <div
        className={"h-screen overflow-y-scroll pl-20 -ml-14 p-6 flex flex-col gap-6"}>
        {feeds.slice(0, 10).map(it => <Rec feed={it} setScreen={props.setScreen}
                                           setFeed={props.setFeed}/>)}
      </div>
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState(0)
  const [feed, setFeed] = useState(null)
  const [likes, setLikes] = useState(231)

  return (
    <div>
      {screen === 0 &&
        <div
          className={"flex flex-row h-screen w-screen overflow-clip bg-[#f4f4f4]"}>
          <Search setScreen={setScreen} setFeed={setFeed}/>
          <Earth setScreen={setScreen} setFeed={setFeed}/>
          <Recs setScreen={setScreen} setFeed={setFeed}/>
        </div>
      }
      {
        screen === 1 &&
        <div className={"w-screen h-screen"}>
          <div className={"p-6 pb-0"}>
            <div
              className={"w-full rounded-2xl overflow-clip shadow-2xl shadow-[#1a1c2c] p-4"}>
              <div className={"h-max w-full"}>
                <img src={hts} alt={"yoman"}
                     className={"h-20 drop-shadow shadow-black hover:cursor-pointer"}
                     onClick={() => setScreen(0)}/>
              </div>
              <div className={"mt-4"}/>
              <div className={"p-2 pt-0"}>
                <div className={"flex flex-col w-full place-content-center"}
                     onPointerOver={ev => ev.stopPropagation()}>
                  {feed.isHardcoded === 1 && <img src={feed.link}
                                                  alt={"uh oh!"}
                                                  className={"aspect-video bg-black vid-thing object-contain rounded-2xl overflow-clip"}/>}
                  {feed.isHardcoded === 2 && <iframe
                    className={"aspect-video object-contain vid-thing rounded-2xl overflow-clip"}
                    src="https://www.youtube.com/embed/6073MnV_aKI?modestbranding=1&controls=0&autoplay=1&showinfo=0"
                    title="NetCam"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>}
                  <div className={"mt-4"}/>
                  <div className={"flex flex-row w-full place-content-center"}>
                    <div
                      className={"flex flex-row place-content-between w-2/3"}>
                      <span className={"sf-ui-bold text-3xl"}>
                        {feed.name}
                      </span>
                      <div
                        className={"flex flex-row-reverse w-auto h-auto place-items-center gap-2"}>
                        <span className={"sf-ui-bold text-xl"}>{likes}</span>
                        <i
                          className="fa-solid fa-thumbs-up text-xl hover:cursor-pointer"
                          onClick={() => setLikes(likes + 1)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"mt-6"}/>
          <div
            className={"flex flex-row w-full pt-6 -mt-6 pb-12 overflow-x-scroll gap-4"}>
            {feeds.slice(0, 10).map(it => <Rec feed={it} hz={true}
                                               setScreen={setScreen}
                                               setFeed={setFeed}/>)}
          </div>
        </div>
      }
      {screen === 2 &&
        <div
          className={"w-screen h-screen flex flex-row place-content-center p-6"}>
          <div
            className={"rounded-2xl w-1/3 overflow-y-scroll p-4"}>
            <div className={"h-max w-full"}>
              <img src={hts} alt={"yoman"}
                   className={"h-20 drop-shadow shadow-black hover:cursor-pointer"}
                   onClick={() => setScreen(0)}/>
            </div>
            <div className={"mt-4"}/>
            <div className={"sf-ui-bold text-6xl mb-6"}>
              About us
            </div>
            <section className="about sf-ui-reg mb-6">
              <div className={"sf-ui-bold text-3xl mb-4"}>Background</div>
              <div className="about-info sf-ui-reg">
                <img src=
                       "https://sotp.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2020/03/Global-637x319.jpg"
                     alt={""} className={" rounded-2xl overflow-clip mb-4"}/>
                <div>
                  <p> When the COVID-19 pandemic hit, people suddenly began to
                    realize the importance of going outside. Something as normal
                    as visiting the local park became a difficult task, and
                    going to a different country was absolutely impossible.
                    Fortunately, the modern age and the World Wide Web have
                    allowed the world to become ever more interconnected.
                    Despite this, there still isn’t a software that allows
                    people to explore and share the world through live footage.
                    This is when NetCam comes in.

                  </p>
                </div>
              </div>
            </section>
            <section className="about1">
              <div className={"sf-ui-bold text-3xl mb-4"}>Purpose and Values
              </div>
              <div className="about1-info sf-ui-reg">
                <img src=
                       {"https://images.inc.com/uploaded_files/image/1920x1080/getty_520289888_129511.jpg"}
                     className={"rounded-2xl overflow-clip mb-4"}/>
                <div>
                  <p> NetCam is a social media site that aims to create an
                    increasingly interconnected world, allowing people to
                    explore different parts of the world through live footage
                    while also sharing parts of their own community.
                  </p>
                  <div className={"sf-ui-bold text-xl mt-4 mb-4"}>Appreciation of the Small Things</div>
                  <p>
                    Around the world, people are hyper fixated on the
                    mainstream: popular trends, influencers, and debates that
                    occur all over social media platforms like Twitter. However,
                    rarely do people appreciate the community around them and
                    the unique aspects of that community. Our platform aims to
                    increase awareness and appreciation of the small things. It
                    could be a local park, a garden, or even a sculpture.

                  </p>
                  <div className={"sf-ui-bold text-xl mt-4 mb-4"}>Accessibility</div>
                  <p>
                    We believe that everyone’s community has something special
                    that should be shared. Therefore, our platform has an
                    incredibly easy process for people to set up and post their
                    live camera streams. Everyone’s streams have an equal
                    opportunity to be shared and are recommended equally.

                  </p>
                  <div className={"sf-ui-bold text-xl mt-4 mb-4"}>Realism</div>
                  <p>
                    Social media propagates unrealistic expectations that are
                    distorted with technology like filters, leading to people
                    feeling inadequate. However, a livestream means that a real,
                    live, representation of something is shown, not something
                    heavily edited. We want to spread real representations of
                    people’s lives, helping people to understand that their life
                    is not worth any less than anyone else’s.

                  </p>

                </div>
              </div>
            </section>
          </div>
        </div>
      }
      {screen === 3 &&
        <div
          className={"w-screen h-screen flex flex-row place-content-center p-6"}>
          <div
            className={"rounded-2xl w-1/3 overflow-y-scroll p-4"}>
            <div className={"h-max w-full"}>
              <img src={hts} alt={"yoman"}
                   className={"h-20 drop-shadow shadow-black hover:cursor-pointer"}
                   onClick={() => setScreen(0)}/>
            </div>
            <div className={"mt-4"}/>
            <div className={"sf-ui-bold text-6xl mb-6"}>
              About us
            </div>
            <section className="about sf-ui-reg mb-6">
              <div className={"sf-ui-bold text-3xl mb-4"}>Background</div>
              <div className="about-info sf-ui-reg">
                <img src=
                       "https://sotp.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2020/03/Global-637x319.jpg"
                     alt={""} className={" rounded-2xl overflow-clip mb-4"}/>
                <div>
                  <p> When the COVID-19 pandemic hit, people suddenly began to
                    realize the importance of going outside. Something as normal
                    as visiting the local park became a difficult task, and
                    going to a different country was absolutely impossible.
                    Fortunately, the modern age and the World Wide Web have
                    allowed the world to become ever more interconnected.
                    Despite this, there still isn’t a software that allows
                    people to explore and share the world through live footage.
                    This is when NetCam comes in.

                  </p>
                </div>
              </div>
            </section>
            <section className="about1">
              <div className={"sf-ui-bold text-3xl mb-4"}>Purpose and Values
              </div>
              <div className="about1-info sf-ui-reg">
                <img src=
                       {"https://images.inc.com/uploaded_files/image/1920x1080/getty_520289888_129511.jpg"}
                     className={"rounded-2xl overflow-clip mb-4"}/>
                <div>
                  <p> NetCam is a social media site that aims to create an
                    increasingly interconnected world, allowing people to
                    explore different parts of the world through live footage
                    while also sharing parts of their own community.
                  </p>
                  <div className={"sf-ui-bold text-xl mt-4 mb-4"}>Appreciation
                    of the Small Things
                  </div>
                  <p>
                    Around the world, people are hyper fixated on the
                    mainstream: popular trends, influencers, and debates that
                    occur all over social media platforms like Twitter. However,
                    rarely do people appreciate the community around them and
                    the unique aspects of that community. Our platform aims to
                    increase awareness and appreciation of the small things. It
                    could be a local park, a garden, or even a sculpture.

                  </p>
                  <div
                    className={"sf-ui-bold text-xl mt-4 mb-4"}>Accessibility
                  </div>
                  <p>
                    We believe that everyone’s community has something special
                    that should be shared. Therefore, our platform has an
                    incredibly easy process for people to set up and post their
                    live camera streams. Everyone’s streams have an equal
                    opportunity to be shared and are recommended equally.

                  </p>
                  <div className={"sf-ui-bold text-xl mt-4 mb-4"}>Realism</div>
                  <p>
                    Social media propagates unrealistic expectations that are
                    distorted with technology like filters, leading to people
                    feeling inadequate. However, a livestream means that a real,
                    live, representation of something is shown, not something
                    heavily edited. We want to spread real representations of
                    people’s lives, helping people to understand that their life
                    is not worth any less than anyone else’s.

                  </p>

                </div>
              </div>
            </section>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
