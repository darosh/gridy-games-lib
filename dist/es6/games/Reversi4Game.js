import { Rectangular8Tile, RectangularGrid, Shape } from 'gridy';
import { ReversiGameBase } from './base/ReversiGameBase';
export class Reversi4Game extends ReversiGameBase {
    constructor() {
        super(new RectangularGrid(1, undefined, Shape.Even, 4, 4, Rectangular8Tile));
    }
}
Reversi4Game.title = 'Reversi 4x4';
Reversi4Game.group = 'Reversi';
Reversi4Game.original = 'ReversiGame';
Reversi4Game.sample = 'c2, c3, b2, b3, b4, a1, d2, d4, a2, a3, a4, c4, pass, c1, b1, pass, d3, d1';
//# sourceMappingURL=Reversi4Game.js.map