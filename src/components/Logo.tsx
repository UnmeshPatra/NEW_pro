import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="0" y="28" className="font-headline text-3xl font-bold fill-primary">
        BizSetup
      </text>
    </svg>
  );
}
