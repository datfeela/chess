import { useAppSelector } from '../hooks/redux'
import { RootState } from './store'

export const selectPieces = (state: RootState) => {
    return state.chess.pieces
}

export const selectIsWhiteMove = (state: RootState) => {
    return state.chess.isWhiteMove
}

export const selectLastMove = (state: RootState) => {
    return state.chess.lastMove
}

export const selectMovesHistory = (state: RootState) => {
    return state.chess.movesHistory
}
