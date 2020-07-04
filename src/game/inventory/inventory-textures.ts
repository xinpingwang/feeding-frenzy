interface InventoryTexture {
  path: string;
  xOffSet: number;
  yOffSet: number;
  wOffSet: number;
  hOffSet: number;
}

let inventoryTextures: { [key: string]: InventoryTexture } = {
  hydrogen: {
    path: '/assets/images/hydrogen.png',
    xOffSet: 1,
    yOffSet: 1,
    wOffSet: 1,
    hOffSet: 1,
  },
  helium: {
    path: '/assets/images/helium.png',
    xOffSet: 1,
    yOffSet: 1,
    wOffSet: 1,
    hOffSet: 1,
  },
  beryllium: {
    path: '/assets/images/beryllium.png',
    xOffSet: 1,
    yOffSet: 1,
    wOffSet: 1,
    hOffSet: 1,
  },
  lithium: {
    path: '/assets/images/lithium.png',
    xOffSet: 1,
    yOffSet: 1,
    wOffSet: 1,
    hOffSet: 1,
  },
  coin: {
    path: '/assets/images/coin.png',
    xOffSet: 1,
    yOffSet: 1,
    wOffSet: 1,
    hOffSet: 1,
  },
};

export default inventoryTextures;
