import { selectPieces } from '../../redux/chessSelectors'
import { Pieces, Square } from '../../redux/chessSlice'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../redux'

export default function usePiecesPositions() {
    const pieces = useAppSelector((state: RootState) => selectPieces(state))

    return selectPiecesPositions(pieces)
}

export function selectPiecesPositions(pieces: {
    white: Pieces
    black: Pieces
}) {
    const whitePiecesPositions: Array<Square> = []
    const blackPiecesPositions: Array<Square> = []

    // refactor to for..in
    Object.entries(pieces.white).forEach((piece) => {
        whitePiecesPositions.push(piece[1].square)
    })
    Object.entries(pieces.black).forEach((piece) => {
        blackPiecesPositions.push(piece[1].square)
    })

    return {
        whitePiecesPositions: whitePiecesPositions,
        blackPiecesPositions: blackPiecesPositions,
    }
}
