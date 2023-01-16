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
    piecesState?: PiecesState
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
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
    range?: 1 | 7
    defaultDirections?: Array<DefaultMoveDirection>
    additionalDirections?: Array<AdditionalMoveDirection>
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
}

export interface checkMoveProps {
    square: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
}

export interface PossibleSquare extends Square {
    isEnemyPieceOnSquare: boolean
}

export interface PossibleSquareWithCheckmate extends PossibleSquare {
    isCheck: boolean
    // isCheckmate: boolean
    // isStalemate: boolean
}

// export interface CheckForDiagonalMovesProps extends CheckForMoveProps {}

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

export type MoveDirectionNum = 0 | 1 | -1 | -2 | 2
// direction on X and Y axes normally, -2 | 2 for knight, because his move is direct 2/1
