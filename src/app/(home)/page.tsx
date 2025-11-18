import Image from 'next/image';

import photo from 'src/photo.jpg';

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
    </>
  );
}

function Hero() {
  return (
    <section className="mx-auto my-32 w-fit row gap-16 items-center">
      <Image
        src={photo}
        alt="My face"
        width={220}
        className="aspect-square object-cover rounded-2xl shadow-xl"
      />

      <div>
        <div className="text-5xl font-semibold">Nils Layet</div>
        <div className="text-2xl leading-relaxed font-medium">TypeScript developer</div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section>
      <p>
        Hi! I'm Nils, a full stack developer, currently working at <a href="https://www.koyeb.com">Koyeb</a>.
      </p>
    </section>
  );
}
