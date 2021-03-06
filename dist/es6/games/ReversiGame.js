import { Rectangular8Tile, RectangularGrid, Shape } from 'gridy';
import { ReversiGameBase } from './base/ReversiGameBase';
export class ReversiGame extends ReversiGameBase {
    constructor() {
        super(new RectangularGrid(1, undefined, Shape.Even, 8, 8, Rectangular8Tile));
    }
}
ReversiGame.title = 'Reversi';
ReversiGame.group = 'Reversi';
ReversiGame.created = 1883;
ReversiGame.authors = ['Lewis Waterman', 'John W. Mollett'];
ReversiGame.wiki = 'https://en.wikipedia.org/wiki/Reversi';
ReversiGame.rules = ['Capture more pieces'];
ReversiGame.location = 'England';
// tslint:disable-next-line:max-line-length
ReversiGame.sample = 'd5, e5, d4, e4, f3, e3, f2, c3, f5, e6, c5, c6, f4, g2, d6, g6, h1, c4, b5, e2, b6, f1, d2, e1, b4, g3, c2, h3, f7, e7, h2, e8, f8, a6, g7, c1, d8, f6, b2, g4, d7, c8, h4, d1, h6, d3, c7, h8, g8, a1, a5, h5, b3, g5, a7, b1, a2, h7, b8, b7, a8, g1, a4, a3';
//# sourceMappingURL=ReversiGame.js.map