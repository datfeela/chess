import {
    Move,
    PawnChangeOptions,
    PieceColor,
} from '../../../../redux/chessSlice'

export interface LastMovePopupProps {
    lastMove: Move
    color: PieceColor
    isCheckmate: boolean
    isStalemate: boolean
    isWhiteMove: boolean
}

export interface HandlePawnChangePopupClickProps {
    pieceType: PawnChangeOptions
}

export interface PawnChangePopupProps {
    handlePopupClick: (pieceType: PawnChangeOptions) => void
    color: PieceColor
}
