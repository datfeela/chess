import { PieceColor, Pieces, PieceType, Square } from '../../redux/chessSlice'

export interface CheckForMovesProps {
    type: PieceType
    name: keyof Pieces
    currentSquare: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
    isWithCheckmateCheck: boolean
    isWithSelfCheckmateCheck: boolean
    isWithAdditionalMovesCheck: boolean
    piecesState?: PiecesState
    isOnStartingPosition?: boolean
    lastMove?: LastMove
    rooksState?: AreRooksOnStartingPositions
}

export interface CheckForCheckProps {
    possibleMoves: Array<PossibleSquare>
    piecesState: PiecesState
    activePieceColor: PieceColor
    activePieceName: keyof Pieces
    isCheckCheck: boolean
}

export interface CanEnemyTakeKingProps {
    enemyPieces: Pieces
    enemyPiecesColor: PieceColor
    whitePiecesPositions: Square[]
    blackPiecesPositions: Square[]
    kingPosition: Square
}

export interface PiecesState {
    white: Pieces
    black: Pieces
}

export interface CheckSquaresProps {
    currentSquare: Square
    color: PieceColor
    type: PieceType
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
    range?: 1 | 7
    isWithAdditionalMovesCheck: boolean
    defaultDirections?: Array<DefaultMoveDirection>
    additionalDirections?: Array<AdditionalMoveDirection>
    isOnStartingPosition?: boolean
    lastMove?: LastMove
    rooksState?: AreRooksOnStartingPositions
    enemyPiecesState?: Pieces
}

export interface CheckSquaresAdditionalDirectionProps {
    additionalDirections: AdditionalMoveDirection[]
    currentSquare: Square
    color: PieceColor
    blackPiecesPositions: Square[]
    whitePiecesPositions: Square[]
    isOnStartingPosition?: boolean
    lastMove: LastMove | undefined
    // only for king additionalMoves check
    rooksState?: AreRooksOnStartingPositions
    enemyPiecesState?: Pieces
}

export interface CheckSquaresOneDirProps {
    currentSquare: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
    range: 1 | 2 | 7
    moveX: MoveDirectionNum
    moveY: MoveDirectionNum
    canOnlyTake?: boolean
    canOnlyMove?: boolean
}

export interface CheckMoveProps {
    square: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
}

export interface AreAllSquaresEmptyProps {
    piecesPositions: Square[]
    squares: Square[]
}

export interface IsCastlingNotInterruptedProps {
    enemyPiecesState: Pieces
    isLeftCastlingPossible: boolean
    isRightCastlingPossible: boolean
    blackPiecesPositions: Square[]
    whitePiecesPositions: Square[]
    color: PieceColor
    currentSquare: Square
}

export interface PossibleSquare extends Square {
    isEnemyPieceOnSquare: boolean
    effect?: PieceMoveEffect
}

export interface PossibleSquareWithCheckmate extends PossibleSquare {
    isCheck: boolean
}

export type DefaultMoveDirection =
    | 'straight'
    | 'diagonally'
    | 'pawnMove'
    | 'knightMove'
export type AdditionalMoveDirection =
    | 'pawnFirstMove'
    | 'pawnEnPassant'
    | 'pawnChange'
    | 'castling'

export type PieceMoveEffect =
    | 'pawnEnPassant'
    | 'pawnChange'
    | 'castlingLeft'
    | 'castlingRight'

export type MoveDirectionNum = 0 | 1 | -1 | -2 | 2
// direction on X and Y axes normally, -2 | 2 for knight, because his move is direct 2/1

// additional moves

export interface LastMove {
    type: PieceType
    color: PieceColor
    isCheck: boolean
    previousPosition: Square
    newPosition: Square
}

export interface AreRooksOnStartingPositions {
    isRook1OnStartingPosition: boolean
    isRook2OnStartingPosition: boolean
}
