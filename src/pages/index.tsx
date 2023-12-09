import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-screen mx-auto px-5 ">
      <div className="flex items-center justify-center gap-8 pt-12">
        <div className="card">
          <div className="flex">
            <Image src={""} alt={""} />
            <h3>閱讀花園</h3>
          </div>
          <div className="flex">
            <Image src={""} alt={""} />
            <h3>
              ★傳遞多元可能性，找到自身價值，未來不設限！★多樣化的現代更應該讀的繪本，成為獨一無二的自己！★三浦太郎繼《小小國王》、《大大公主》後的精采續集日本人氣兒童繪本作家三浦太郎繼《小小國王》、《大大公主...
            </h3>
          </div>
        </div>
        <div className="card">
          <div className="flex">
            <Image src={""} alt={""} />
            <h3>閱讀花園</h3>
          </div>
          <div className="flex">
            <Image src={""} alt={""} />
            <h3>
              ★傳遞多元可能性，找到自身價值，未來不設限！★多樣化的現代更應該讀的繪本，成為獨一無二的自己！★三浦太郎繼《小小國王》、《大大公主》後的精采續集日本人氣兒童繪本作家三浦太郎繼《小小國王》、《大大公主...
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}
