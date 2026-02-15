function engineGame(options) {
    options = options || {};

    var game = new Chess();
    var board;
    var engine = new Worker(options.stockfishjs || 'js/stockfish.js');
    var playerColor = 'white';
    var skillLevel = 8;
    var searchDepth = 3;
    var isThinking = false;
    var displayScore = false;
    var currentScore = '';

    // Initialize Stockfish
    engine.postMessage('uci');

    engine.onmessage = function (event) {
        var line = typeof event === 'object' ? event.data : event;

        if (line === 'uciok') {
            engine.postMessage('isready');
            setEngineStatus('loaded');
        } else if (line === 'readyok') {
            setEngineStatus('ready');
        }

        // Best move found
        var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        if (match) {
            isThinking = false;
            game.move({ from: match[1], to: match[2], promotion: match[3] });
            board.position(game.fen());
            updateUI();
        }

        // Search depth info
        var depthMatch = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/);
        if (depthMatch) {
            var statusText = 'Thinking... Depth: ' + depthMatch[1];
            if (currentScore && displayScore) {
                statusText += ' | Score: ' + currentScore;
            }
            setEngineStatus(statusText);
        }

        // Score info
        var scoreMatch = line.match(/^info .*\bscore (\w+) (-?\d+)/);
        if (scoreMatch) {
            var score = parseInt(scoreMatch[2]) * (game.turn() === 'w' ? 1 : -1);
            if (scoreMatch[1] === 'cp') {
                currentScore = (score / 100).toFixed(1);
            } else if (scoreMatch[1] === 'mate') {
                currentScore = 'Mate in ' + Math.abs(score);
            }
        }
    };

    function setEngineStatus(text) {
        var el = document.getElementById('engineStatus');
        if (el) el.textContent = 'Engine: ' + text;
    }

    function getCurrentTurnColor() {
        return game.turn() === 'w' ? 'white' : 'black';
    }

    function getMoveString() {
        var moves = '';
        var history = game.history({ verbose: true });
        for (var i = 0; i < history.length; i++) {
            var move = history[i];
            moves += ' ' + move.from + move.to + (move.promotion || '');
        }
        return moves;
    }

    function makeEngineMove() {
        if (isThinking || game.game_over()) return;
        isThinking = true;
        currentScore = '';
        setEngineStatus('Thinking...');

        var moves = getMoveString();
        if (moves) {
            engine.postMessage('position startpos moves' + moves);
        } else {
            engine.postMessage('position startpos');
        }
        engine.postMessage('go depth ' + searchDepth);
    }

    function updateUI() {
        // Update FEN display
        var fenEl = document.getElementById('fenString');
        if (fenEl) fenEl.textContent = game.fen();

        // Update PGN display
        var pgnEl = document.getElementById('pgn');
        if (pgnEl) pgnEl.textContent = game.pgn();

        // Update game status
        updateGameStatus();

        // If engine's turn, start thinking
        if (!game.game_over() && getCurrentTurnColor() !== playerColor) {
            makeEngineMove();
        }

        if (!game.game_over()) {
            var scoreText = 'ready';
            if (currentScore && displayScore) {
                scoreText += ' | Score: ' + currentScore;
            }
            if (getCurrentTurnColor() === playerColor) {
                setEngineStatus(scoreText);
            }
        }
    }

    function updateGameStatus() {
        var statusEl = document.getElementById('status');
        if (!statusEl) return;

        statusEl.className = 'status';

        if (game.in_checkmate()) {
            var winner = game.turn() === 'w' ? 'Black' : 'White';
            statusEl.textContent = 'Checkmate! ' + winner + ' wins!';
            statusEl.className = 'status win';
            setEngineStatus('Game over');
        } else if (game.in_stalemate()) {
            statusEl.textContent = 'Stalemate — Draw!';
            statusEl.className = 'status draw';
            setEngineStatus('Game over');
        } else if (game.in_threefold_repetition()) {
            statusEl.textContent = 'Draw by threefold repetition!';
            statusEl.className = 'status draw';
            setEngineStatus('Game over');
        } else if (game.insufficient_material()) {
            statusEl.textContent = 'Draw — Insufficient material!';
            statusEl.className = 'status draw';
            setEngineStatus('Game over');
        } else if (game.in_draw()) {
            statusEl.textContent = 'Draw!';
            statusEl.className = 'status draw';
            setEngineStatus('Game over');
        } else if (game.in_check()) {
            var turn = game.turn() === 'w' ? 'White' : 'Black';
            statusEl.textContent = turn + ' is in check!';
            statusEl.className = 'status check';
        } else {
            var turn = game.turn() === 'w' ? 'White' : 'Black';
            statusEl.textContent = turn + ' to move';
        }
    }

    // Board event handlers
    function onDragStart(source, piece) {
        if (game.game_over()) return false;
        if (isThinking) return false;
        if (getCurrentTurnColor() !== playerColor) return false;
        if (playerColor === 'white' && piece.search(/^b/) !== -1) return false;
        if (playerColor === 'black' && piece.search(/^w/) !== -1) return false;
        return true;
    }

    function onDrop(source, target) {
        // Default to queen promotion (most common)
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        updateUI();
    }

    function onSnapEnd() {
        board.position(game.fen());
    }

    // Create the board
    board = new ChessBoard('board', {
        draggable: true,
        position: 'start',
        pieceTheme: 'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/img/chesspieces/wikipedia/{piece}.png',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    });

    return {
        game: game,
        board: board,
        reset: function () {
            game.reset();
            board.position('start');
        },
        setPlayerColor: function (color) {
            playerColor = color;
            board.orientation(playerColor);
        },
        setSkillLevel: function (level) {
            skillLevel = level;
            engine.postMessage('setoption name Skill Level value ' + level);

            // Map skill level to search depth
            if (level <= 3) {
                searchDepth = 1;
            } else if (level <= 7) {
                searchDepth = 3;
            } else if (level <= 12) {
                searchDepth = 5;
            } else if (level <= 17) {
                searchDepth = 8;
            } else {
                searchDepth = 12;
            }
        },
        setDisplayScore: function (flag) {
            displayScore = flag;
        },
        start: function () {
            engine.postMessage('ucinewgame');
            engine.postMessage('isready');
            isThinking = false;
            currentScore = '';
            board.position(game.fen());
            updateUI();
        },
        undo: function () {
            if (isThinking) return false;
            // Undo both player and engine move
            game.undo();
            game.undo();
            board.position(game.fen());
            updateUI();
            return true;
        }
    };
}
