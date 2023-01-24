import { selectPieces } from '../../redux/chessSelectors'
import { PieceName, Pieces, Square } from '../../redux/chessSlice'
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

    for (let name in pieces.white) {
        if (pieces.white[name as PieceName].square === null) continue
        whitePiecesPositions.push(
            pieces.white[name as PieceName].square as Square
        )
    }

    for (let name in pieces.black) {
        if (pieces.black[name as PieceName].square === null) continue
        blackPiecesPositions.push(
            pieces.black[name as PieceName].square as Square
        )
    }

    return {
        whitePiecesPositions: whitePiecesPositions,
        blackPiecesPositions: blackPiecesPositions,
    }
}
