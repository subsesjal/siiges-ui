import React from 'react';
import Image from 'next/image';

export default function Background() {
  return (
    <Image
      alt="travel"
      src="/Fondo.png"
      layout="fill"
      quality={100}
      objectFit="cover"
      style={{
        zIndex: -1,
      }}
    />
  );
}
