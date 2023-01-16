import { selectPiecesPositions } from '../../hooks/chess/usePiecesPositions'
import { PieceColor, Pieces, Square } from '../../redux/chessSlice'
import { checkForPieceMoves } from './checkForMoves'
import {
    CanEnemyTakeKingProps,
    CheckForCheckProps,
    PiecesState,
    PossibleSquareWithCheckmate,
} from './chessHelpersTypes'

export function checkForCheck({
    possibleMoves,
    piecesState,
    activePieceColor,
    activePieceName,
    isCheckCheck,
}: CheckForCheckProps) {
    let possibleMovesAfterCheck: PossibleSquareWithCheckmate[] = []

    possibleMoves.forEach((possibleMove) => {
        // simulate a move to check for a checkmate situations
        const piecesStateAfterMove: PiecesState = JSON.parse(
            JSON.stringify(piecesState)
        )
        piecesStateAfterMove[activePieceColor][activePieceName].square = {
            x: possibleMove.x,
            y: possibleMove.y,
        }
        const { whitePiecesPositions, blackPiecesPositions } =
            selectPiecesPositions(piecesStateAfterMove)

        // select active player king's position
        const activePlayerKingPosition = piecesStateAfterMove[activePieceColor]
            .king.square as Square

        // select enemy pieces, which possible moves we need to check
        const enemyPiecesColor: PieceColor =
            activePieceColor === 'white' ? 'black' : 'white'
        const enemyPieces = piecesStateAfterMove[enemyPiecesColor]

        // check if the move is incorrect
        //! console.log(`move: ${possibleMove.x}-${possibleMove.y}`) //test
        const isSelfCheckMate = canEnemyTakeKing({
            enemyPiecesColor,
            enemyPieces,
            whitePiecesPositions,
            blackPiecesPositions,
            kingPosition: activePlayerKingPosition,
        })

        if (isSelfCheckMate) return

        if (isCheckCheck) {
            //check if the move is Check
            const isCheck = canEnemyTakeKing({
                enemyPiecesColor: activePieceColor,
                enemyPieces: piecesStateAfterMove[activePieceColor],
                whitePiecesPositions,
                blackPiecesPositions,
                kingPosition: piecesStateAfterMove[enemyPiecesColor].king
                    .square as Square,
            })

            const possibleMoveWithCheckMate: PossibleSquareWithCheckmate = {
                ...possibleMove,
                isCheck,
                // isCheckmate: isCheck && !isEnemyMovePossible,
                // isStalemate: !isCheck && !isEnemyMovePossible,
            }
            possibleMovesAfterCheck.push(possibleMoveWithCheckMate)
            return
        } else {
            possibleMovesAfterCheck.push({ ...possibleMove, isCheck: false })
        }
    })

    return possibleMovesAfterCheck
}

function canEnemyTakeKing({
    enemyPieces,
    enemyPiecesColor,
    whitePiecesPositions,
    blackPiecesPositions,
    kingPosition,
}: CanEnemyTakeKingProps) {
    // here we call checkForPieceMoves() for all pieces in PiecesState and if any move is taking the king - this move is self-checkmate(incorrect move)

    let canTakeKing = false
    // let isEnemyMovePossible = false

    enemyPiecesMovesCheck: for (let name in enemyPieces) {
        const possibleEnemyPieceMoves = checkForPieceMoves({
            type: enemyPieces[name as keyof Pieces].type,
            name: name as keyof Pieces,
            color: enemyPiecesColor,
            currentSquare: enemyPieces[name as keyof Pieces].square as Square,
            whitePiecesPositions,
            blackPiecesPositions,
            isWithCheckmateCheck: false,
            isWithSelfCheckmateCheck: false,
        })
        //! console.log(name, possibleEnemyPieceMoves) //test

        // if (
        //     !isEnemyMovePossible &&
        //     possibleEnemyPieceMoves.possibleMoves.length > 0
        // )
        //     isEnemyMovePossible = true

        const possibleEnemyTakes =
            possibleEnemyPieceMoves.piecesCanBeTakenCoords

        for (let i in possibleEnemyTakes) {
            // if enemy can take king
            if (
                possibleEnemyTakes[i].x === kingPosition.x &&
                possibleEnemyTakes[i].y === kingPosition.y
            ) {
                canTakeKing = true
                break enemyPiecesMovesCheck
            }
        }
    }

    // return { isCheck: canEnemyTakeKing, isEnemyMovePossible }
    return canTakeKing
}
