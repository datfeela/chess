import { PieceMoveEffect } from '../../../func/chess/chessHelpersTypes'
import {
    PieceColor,
    Pieces,
    PieceType,
    Square,
} from '../../../redux/chessSlice'

interface ActiveSquare extends Square {
    isEnemyPieceOnSquare: boolean
    isCheck: boolean
    effect?: PieceMoveEffect
}

export type ActiveSquares = null | ActiveSquare[]

export interface ActivePiece {
    name: keyof Pieces
    type: PieceType
    color: PieceColor
    currentSquare: Square
    isOnStartingPosition?: boolean
}

export type ActivePieceNullable = ActivePiece | null

// common functions props

export interface MakeMoveProps {
    activePiece: ActivePiece
    squareCoords: Square
    isCheck: boolean
    effect?: PieceMoveEffect
}

export interface handlePieceClickProps {
    name: keyof Pieces
    currentSquare: Square
    type: PieceType
    color: PieceColor
    isOnStartingPosition?: boolean
}
