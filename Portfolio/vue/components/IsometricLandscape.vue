<template>
</template>

<script lang="ts">
import P5 from 'p5';

const WIDTH = 40;
const HEIGHT = 20;
const DEPTH = 40;
const SURFACE_Y = 8;
const BLOCK_SIZE = 15;
const SEA_LEVEL = 7;
const DIRT_LAYER = 2;

const enum Block {
  AIR,
  WATER,
  STONE,
  DIRT,
  GRASS,
  SAND,
  WOOD,
  LEAVES,
};

const tree: Structure = {
  [Block.WOOD]: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 2, 0],
    [0, 3, 0],
  ],

  [Block.LEAVES]: [
    [1, 2, 0],
    [-1, 2, 0],
    [1, 3, 0],
    [-1, 3, 0],
    [0, 2, 1],
    [0, 2, -1],
    [0, 3, 1],
    [0, 3, -1],
    [0, 4, 0]
  ]
};

export default {
  name: "IsometricLandscape",

  data() {
    return {
      blocks: new Array(WIDTH).fill(null).map(() => // X
        new Array(HEIGHT).fill(null).map(() =>      // Y
          new Array(DEPTH).fill(Block.AIR)          // Z
        )
      ),
      surfacesY: new Array(WIDTH).fill(null).map(() => // X
        new Array(HEIGHT).fill(SURFACE_Y)              // Z
      )
    }
  },

  methods: {
    setup(p: P5) {
      p.angleMode(p.DEGREES);
      p.createCanvas(1400, 750);

      this.generateWorld(p);
      // p.noLoop();
    },

    generateDecorations(p: P5) {
      for (let x = 0; x < WIDTH; x++) for (let z = 0; z < DEPTH; z++) {
        const surfaceY = this.surfacesY[x][z];

        // Trees
        if (surfaceY > SEA_LEVEL && p.floor(surfaceY * 100) % 50 == 0) {
          this.summon(tree, x, p.ceil(surfaceY), z)
        }
      }
    },

    updateWorld(p: P5) {
      this.blocks.shift();
      this.blocks[WIDTH - 1] = new Array(HEIGHT).fill(null).map(() => new Array(DEPTH).fill(Block.AIR))
      this.surfacesY.shift();
      this.surfacesY[WIDTH - 1] = new Array(HEIGHT).fill(SURFACE_Y);
      this.generateLine(p, WIDTH - 1)
      this.generateDecorations(p);
    },

    generateWorld(p: P5) {
      for (let x = 0; x < WIDTH; x++) {
        this.generateLine(p, x);
      }

      this.generateDecorations(p);
    },

    generateLine(p: P5, x: number) {
      // Terrain Shaping
      for (let z = 0; z < DEPTH; z++) {
        this.surfacesY[x][z] = this.getSurfaceY(p, x + p.frameCount, z);
      }

      // Block Types
      for (let y = 0; y < HEIGHT; y++) for (let z = 0; z < DEPTH; z++) {
        this.blocks[x][y][z] = this.getBlock(x, y, z)
      }
    },

    summon(structure: Structure, x: number, y: number, z: number) {
      for (const block in structure) for (const [bx, by, bz] of structure[block]) try {
        this.blocks[x + bx][y + by][z + bz] = parseInt(block);
      } catch { }
    },

    getSurfaceY(p: P5, x: number, z: number) {
      let surfaceY = SURFACE_Y + p.noise(x / 30, z / 30) * 20 - HEIGHT / 2;
      if (surfaceY > HEIGHT) surfaceY = HEIGHT;
      return surfaceY;
    },

    getBlock(x: number, y: number, z: number) {
      const surfaceY = this.surfacesY[x][z];
      const yDiff = surfaceY - y;

      if (yDiff < 0 && y < SEA_LEVEL) return Block.WATER;
      if (yDiff > DIRT_LAYER + 1) return Block.STONE;
      if (yDiff > 1) return Block.DIRT;
      if (yDiff > 0 && y < SEA_LEVEL - 1) return Block.SAND;
      if (yDiff > 0) return Block.GRASS;

      return Block.AIR;
    },

    draw(p: P5) {
      // this.updateWorld(p);
      p.background('#449EFF');

      p.fill("#ddeeff")
        .textSize(50)
        .text(p.frameCount, 40, 70);

      this.drawBlocks(p);
    },

    drawBlocks(p: P5) {
      for (let x = 0; x < WIDTH; x++)for (let y = 0; y < HEIGHT; y++) for (let z = 0; z < DEPTH; z++) {

        const block = this.blocks[x]?.[y]?.[z];
        if (!block) continue;
        if (block === Block.AIR) continue

        const leftBlock = this.blocks[x][y][z + 1],
          topBlock = this.blocks[x][y + 1]?.[z],
          rightBlock = this.blocks[x + 1]?.[y]?.[z];

        let faces = 0;

        if (!leftBlock || leftBlock === Block.AIR ||
          (block !== Block.WATER && leftBlock === Block.WATER)) faces += 1;
        if (!rightBlock || rightBlock === Block.AIR ||
          (block !== Block.WATER && rightBlock === Block.WATER)) faces += 16;
        if (!topBlock || topBlock === Block.AIR ||
          (block !== Block.WATER && topBlock === Block.WATER)) faces += 256;

        if (faces === 0) continue;
        this.drawBlock(p, x - WIDTH / 2, y - HEIGHT / 2, z - DEPTH / 2, block, faces);
      }
    },

    drawBlock(p: P5, bx: number, by: number, bz: number, type: Block, faces: number) {
      let color;
      switch (type) {
        case Block.STONE:
          color = [130, 130, 130];
          break;

        case Block.WATER:
          p.fill([20, 80, 200, 100])
          p.noStroke();
          break;

        case Block.GRASS:
          color = [60, 150, 90];
          break;

        case Block.LEAVES:
          color = [80, 180, 110];
          break;

        case Block.DIRT:
          color = [130, 80, 25];
          break;

        case Block.SAND:
          color = [240, 210, 90];
          break;

        case Block.WOOD:
          color = [90, 70, 15];
          break;

        default: return;
      }

      const x =
        p.width / 2 +
        bx * BLOCK_SIZE * p.sin(60) -
        bz * BLOCK_SIZE * p.sin(60);

      const y =
        p.height / 2 +
        bx * BLOCK_SIZE * p.cos(60) +
        bz * BLOCK_SIZE * p.cos(60) -
        by * BLOCK_SIZE;

      // Left
      if (faces & 1) {
        if (color) {
          p.fill(color);
          p.stroke(color);
        }

        p.beginShape()
          .vertex(x, y)
          .vertex(x, y + BLOCK_SIZE)
          .vertex(x - BLOCK_SIZE * p.sin(60), y + BLOCK_SIZE * p.cos(60))
          .vertex(x - BLOCK_SIZE * p.sin(60), y - BLOCK_SIZE * p.cos(60))
          .endShape(p.CLOSE);
      }

      // Right
      if (faces & 16) {
        if (color) {
          p.fill(color.map((c) => c - 20));
          p.stroke(color.map((c) => c - 20));
        }

        p.beginShape()
          .vertex(x, y)
          .vertex(x, y + BLOCK_SIZE)
          .vertex(x + BLOCK_SIZE * p.sin(60), y + BLOCK_SIZE * p.cos(60))
          .vertex(x + BLOCK_SIZE * p.sin(60), y - BLOCK_SIZE * p.cos(60))
          .endShape(p.CLOSE);
      }

      // Top
      if (faces & 256) {
        if (color) {
          p.fill(color.map((c) => c + 20));
          p.stroke(color.map((c) => c + 20));
        }

        p.beginShape()
          .vertex(x, y)
          .vertex(x + BLOCK_SIZE * p.sin(60), y - BLOCK_SIZE * p.cos(60))
          .vertex(x, y - BLOCK_SIZE * p.cos(60) * 2)
          .vertex(x - BLOCK_SIZE * p.sin(60), y - BLOCK_SIZE * p.cos(60))
          .endShape(p.CLOSE);
      }
    }

  },

  mounted() {
    new P5((p5) => {
      p5.setup = () => this.setup(p5)
      p5.draw = () => this.draw(p5)
    })
  }
}

declare type Structure = {
  [key in Block]?: [number, number, number][]
}

</script>

<style lang="less">
main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>