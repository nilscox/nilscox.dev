type BackgroundProps = {
  width: number;
  height: number;
};

export const Background = ({ width, height }: BackgroundProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`2 0 ${4 * width - 2} ${3 * height - 2}`}
    width="100%"
    opacity={0.15}
  >
    <Defs />

    {Array(width * height)
      .fill(null)
      .map((_, index) => {
        const i = Math.floor(index / height);
        const j = index % height;

        const ci = width / 2;
        const cj = height / 2;

        if (Math.random() > j / height) {
          return null;
        }

        if ((i - ci) ** 2 / (height / 3) ** 2 + (j - cj) ** 2 / (height / 4) ** 2 < 1) {
          return null;
        }

        const x = 4 * i + (j % 2 === 0 ? 0 : 2);
        const y = 3 * j;

        const anim: React.SVGProps<SVGAnimateElement> = {
          dur: '1600ms',
          begin: `${i / 30 + j / 20 + 3} ; ${index}.end+10s`,
          calcMode: 'spline',
          keySplines: '0.5 0 0.5 1 ; 0.5 0 0.5 1',
        };

        return (
          <use key={index} href="#cube" x={x} y={y}>
            <animate id={String(index)} attributeName="y" values={[y, y - 0.5, y].join(';')} {...anim} />
            {/* <animate attributeName="opacity" values="1 ; 0.7 ; 1" {...anim} /> */}
          </use>
        );
      })}
  </svg>
);

const Defs = () => (
  <defs>
    <path id="face1" d="M 0 0 L 2 -1 L 4 0 L 2 1 Z" />
    <path id="face2" d="M 0 0 L 2 1 L 2 3 L 0 2 Z" />
    <path id="face3" d="M 4 0 L 2 1 L 2 3 L 4 2 Z" />

    <g id="cube">
      <use href="#face1" fill="#0006" />
      <use href="#face2" fill="#0003" />
      <use href="#face3" fill="#0009" />
    </g>
  </defs>
);
