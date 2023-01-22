import { LastMove, PiecesState } from './chessHelpersTypes'
import { PieceColor, Pieces, Square } from '../../redux/chessSlice'
import { checkForPieceMoves } from './checkForMoves'

export function checkForStalemate({
    piecesToCheck,
    colorToCheck,
    whitePiecesPositions,
    blackPiecesPositions,
    piecesState,
    lastMove,
}: CheckForStalemateProps) {
    let isAnyMovePossible = false

    for (let name in piecesToCheck) {
        const possiblePieceMoves = checkForPieceMoves({
            type: piecesToCheck[name as keyof Pieces].type,
            name: name as keyof Pieces,
            color: colorToCheck,
            currentSquare: piecesToCheck[name as keyof Pieces].square as Square,
            whitePiecesPositions,
            blackPiecesPositions,
            piecesState,
            isWithCheckmateCheck: false,
            isWithSelfCheckmateCheck: true,
            isWithAdditionalMovesCheck: true,
            isOnStartingPosition:
                piecesToCheck[name as keyof Pieces].isOnStartingPosition,
            lastMove,
        })

        if (possiblePieceMoves.possibleMoves.length > 0) {
            isAnyMovePossible = true
            break
        }
    }

    return isAnyMovePossible
}

interface CheckForStalemateProps {
    piecesToCheck: Pieces
    colorToCheck: PieceColor
    blackPiecesPositions: Square[]
    whitePiecesPositions: Square[]
    piecesState: PiecesState
    lastMove: LastMove
}
