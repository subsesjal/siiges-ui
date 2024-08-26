import React from 'react';
import Image from 'next/image';

export default function UsuarioAvatar() {
  return (
    <Image
      alt="avatar"
      src="/avatar.png"
      quality={100}
      width="300px"
      height="300px"
      style={{
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
}
