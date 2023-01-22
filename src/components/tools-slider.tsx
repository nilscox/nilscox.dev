import { useRef, useEffect } from 'react';

type ToolsSliderProps = {
  children: React.ReactNode;
};

export const ToolsSlider = ({ children }: ToolsSliderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = ref.current;

    if (!div) {
      return;
    }

    const xs = Array<number>(div.children.length).fill(0);

    for (const child of div.children) {
      const elem = child as HTMLElement;
      elem.style.transform = 'translateX(0px)';
    }

    let id = requestAnimationFrame(function frame() {
      let idx = 0;

      for (const child of div.children) {
        const elem = child as HTMLElement;

        xs[idx] -= 1;

        if (xs[idx] + elem.offsetLeft < -50) {
          xs[idx] += div.clientWidth;
        }

        elem.style.transform = `translateX(${xs[idx]}px)`;
        idx++;
      }

      id = requestAnimationFrame(frame);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="row relative overflow-hidden">
      <div ref={ref} className="row gap-8 py-4 pl-8">
        {children}
      </div>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className="absolute left-0 h-full w-[6rem] bg-gradient-to-r from-neutral md:w-[12rem]" />
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className="absolute right-0 h-full w-[6rem] bg-gradient-to-l from-neutral md:w-[12rem]" />
    </div>
  );
};
