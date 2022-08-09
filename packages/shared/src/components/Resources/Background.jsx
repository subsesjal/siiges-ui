import React from 'react';
import Image from 'next/image';

export default function Background() {
  return (
    <Image
      alt="travel"
      src="/Fondo.jpg"
      layout="fill"
      objectFit="cover"
      quality={100}
      style={{
        zIndex: -1,
        overflow: 'hidden',
      }}
    />
  );
}
