import { RootState } from './store'

export const selectPieces = (state: RootState) => {
    return state.chess.pieces
}

export const selectIsWhiteMove = (state: RootState) => {
    return state.chess.isWhiteMove
}
