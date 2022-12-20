import {
    PieceColor,
    Pieces,
    PieceType,
    Square,
} from '../../../redux/chessSlice'

interface ActiveSquare extends Square {
    isEnemyPieceOnSquare: boolean
}

export type ActiveSquares = null | ActiveSquare[]

export interface ActivePiece {
    name: keyof Pieces
    type: PieceType
    color: PieceColor
    currentSquare: Square
}

export type ActivePieceNullable = ActivePiece | null

// common functions props

export interface MakeMoveProps {
    activePiece: ActivePiece
    squareCoords: Square
}

export interface handlePieceClickProps {
    name: keyof Pieces
    currentSquare: Square
    type: PieceType
    color: PieceColor
}
