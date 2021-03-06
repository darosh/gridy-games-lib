import { IGrid } from 'gridy';
import { IGame } from './IGame';
import { IGameTile, IGridGame } from './IGridGame';
import { other } from './utils';

export class TimedProxy implements IGame, IGridGame {
  public game: IGame & IGridGame;

  public limit: number = 10000;
  public countdown: number = 5;
  public countdownSignal: number = 3;
  public signalDelay: number = 100;

  public counter: number = -1;
  public counterSignal: number = -1;
  public expired: boolean = false;
  public pending: boolean = false;

  private timer: NodeJS.Timer | null = null;
  private timeoutWinner: number | null = null;

  constructor(game: IGame & IGridGame, opt = {}) {
    this.game = game;
    this.constructor = game.constructor;
    Object.assign(this, opt);

    this.bind('winning');
    this.bind('links');
    this.bind('rulers');
    this.bind('dots');
  }

  public dispose() {
    this.stop();
  }

  get grid(): IGrid<IGameTile> {
    return this.game.grid;
  }

  get scale() {
    return this.game.scale;
  }

  get moves() {
    return this.game.moves;
  }

  public possible(): any[] {
    return this.game.possible();
  }

  public undo(): void {
    this.game.undo();
  }

  public move(m: any): void {
    this.game.move(m);

    if (!this.game.winner && this.game.moves[this.game.moves.length - 1]) {
      this.start();
    } else {
      this.stop();
      this.counter = -1;
      this.counterSignal = -1;
      this.expired = false;
    }
  }

  public evaluate(): number {
    return this.game.evaluate();
  }

  public get player() {
    return this.game.player;
  }

  public get winner(): number {
    return this.timeoutWinner || this.game.winner;
  }

  public get score(): any {
    return this.game.score;
  }

  public get landscape(): any {
    return this.game.landscape;
  }

  public get hull(): any {
    return this.game.hull;
  }

  public moveToString(move: any): string {
    return this.game.moveToString ? this.game.moveToString(move) : '';
  }

  public stringToMove(move: string): any {
    return (<any>this.game).stringToMove(move);
  }

  private start() {
    this.stop(!!this.limit);

    this.counter = -1;
    this.counterSignal = -1;
    this.expired = false;
    this.timeoutWinner = null;

    if (!this.limit) {
      return;
    }

    let counter = this.countdown;

    this.timer = setInterval(() => {
      this.stop(true);
      this.counter = counter;
      this.timer = setInterval(() => {
        counter--;

        if (counter <= this.countdownSignal) {
          this.counterSignal = counter;
        }

        setTimeout(() => {
          this.counter = counter;

          if (!counter) {
            this.stop();
            this.expired = true;
            this.timeoutWinner = other(this.game.player);
          }
        },         this.signalDelay);
      },                       1000);
    },                       this.limit - counter * 1000 - this.signalDelay);
  }

  private stop(pending = false) {
    this.pending = pending;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private bind(prop: string) {
    if ((<any>this.game)[prop]) {
      (<any>this)[prop] = (<any>this.game)[prop].bind(this.game);
    }
  }
}
