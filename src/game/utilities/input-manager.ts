import Game from '../game';

export default class InputManager {
  constructor(private game: Game) {
    window.addEventListener('keydown', this.keypress.bind(this));
  }

  keypress(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 80:
        this.game.state !== 'paused'
          ? (this.game.state = 'paused')
          : (this.game.state = 'survival');
    }
  }
}
