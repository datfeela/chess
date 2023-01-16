import { Square, SquareNum } from './../../redux/chessSlice'
import { checkForCheck } from './checkForCheck'
import {
    CheckForMovesProps,
    checkMoveProps,
    CheckSquaresOneDirProps,
    CheckSquaresProps,
    MoveDirectionNum,
    PiecesState,
    PossibleSquare,
    PossibleSquareWithCheckmate,
} from './chessHelpersTypes'

// !isWithCheckmateCheck should be true only when called from Board.tsx, or from Board's effects, when activating a piece or checking for check/stale-mate
// !with this setting enabled moves will be calculated recursively with check/checkmate/stalemate check
export function checkForPieceMoves({
    isWithCheckmateCheck = true,
    isWithSelfCheckmateCheck = true,
    type,
    name,
    piecesState,
    currentSquare,
    color,
    blackPiecesPositions,
    whitePiecesPositions,
}: CheckForMovesProps) {
    let possibleMoves = [] as PossibleSquare[]

    const checkSquaresSharedProps = {
        color,
        currentSquare,
        blackPiecesPositions,
        whitePiecesPositions,
    }

    // call checkSquares based on piece type
    switch (type) {
        case 'pawn': {
            possibleMoves = checkSquares({
                range: 1,
                ...checkSquaresSharedProps,
                defaultDirections: ['pawnMove'],
                additionalDirections: [
                    'pawnFirstMove',
                    'pawnEnPassant',
                    'pawnChange',
                ],
            })
            // pawnEnPassant?
            break
        }
        case 'rook': {
            possibleMoves = checkSquares({
                range: 7,
                ...checkSquaresSharedProps,
                defaultDirections: ['straight'],
            })
            break
        }
        case 'knight': {
            possibleMoves = checkSquares({
                range: 1,
                ...checkSquaresSharedProps,
                defaultDirections: ['knightMove'],
            })
            break
        }
        case 'bishop': {
            possibleMoves = checkSquares({
                range: 7,
                ...checkSquaresSharedProps,
                defaultDirections: ['diagonally'],
            })
            break
        }
        case 'queen': {
            possibleMoves = checkSquares({
                range: 7,
                ...checkSquaresSharedProps,
                defaultDirections: ['diagonally', 'straight'],
            })
            break
        }
        case 'king': {
            possibleMoves = checkSquares({
                range: 1,
                ...checkSquaresSharedProps,
                defaultDirections: ['diagonally', 'straight'],
            })
            break
        }
    }

    let piecesCanBeTakenCoords = [] as Square[]
    // got all moves piece can make, need to filter wrong moves and find out if move is a check
    // if !isWithCheckmateCheck - it's already being checked recursively for next move
    if (isWithCheckmateCheck || isWithSelfCheckmateCheck) {
        let possibleMovesWithCheckmate = checkForCheck({
            possibleMoves,
            piecesState: piecesState as PiecesState,
            activePieceColor: color,
            activePieceName: name,
            isCheckCheck: isWithCheckmateCheck,
        }) as PossibleSquareWithCheckmate[]

        piecesCanBeTakenCoords = selectPiecesCanBeTakenCoords(
            possibleMovesWithCheckmate
        )
        return {
            possibleMoves: possibleMovesWithCheckmate,
            piecesCanBeTakenCoords,
        }
    }

    piecesCanBeTakenCoords = selectPiecesCanBeTakenCoords(possibleMoves)
    return { possibleMoves, piecesCanBeTakenCoords }
}

// helpers for checkForPieceMoves

function selectPiecesCanBeTakenCoords(
    possibleMoves: PossibleSquare[] | PossibleSquareWithCheckmate[]
) {
    return possibleMoves
        .filter((move) => move.isEnemyPieceOnSquare)
        .map((move) => ({ x: move.x, y: move.y }))
}

// call multiple one-direction/additional-direction checks
function checkSquares({
    currentSquare,
    color,
    whitePiecesPositions,
    blackPiecesPositions,
    range,
    defaultDirections,
    additionalDirections,
}: CheckSquaresProps) {
    const possibleSquares = [] as Array<PossibleSquare>
    const defaultDirectionsNum = [] as Array<{
        x: MoveDirectionNum
        y: MoveDirectionNum
        canOnlyTake?: boolean
    }>

    defaultDirections &&
        defaultDirections.forEach((direction) => {
            switch (direction) {
                case 'pawnMove':
                    if (color === 'white') {
                        defaultDirectionsNum.push(
                            { x: 1, y: 1, canOnlyTake: true },
                            { x: -1, y: 1, canOnlyTake: true }
                        )
                        defaultDirectionsNum.push({ x: 0, y: 1 })
                    }
                    if (color === 'black') {
                        defaultDirectionsNum.push(
                            { x: 1, y: -1, canOnlyTake: true },
                            { x: -1, y: -1, canOnlyTake: true }
                        )
                        defaultDirectionsNum.push({ x: 0, y: -1 })
                    }
                    break
                case 'knightMove': {
                    defaultDirectionsNum.push(
                        { x: 1, y: 2 },
                        { x: 1, y: -2 },
                        { x: -1, y: 2 },
                        { x: -1, y: -2 },
                        { x: 2, y: 1 },
                        { x: 2, y: -1 },
                        { x: -2, y: 1 },
                        { x: -2, y: -1 }
                    )
                    break
                }
                case 'straight':
                    defaultDirectionsNum.push(
                        { x: 1, y: 0 },
                        { x: -1, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: -1 }
                    )
                    break
                case 'diagonally':
                    defaultDirectionsNum.push(
                        { x: 1, y: 1 },
                        { x: 1, y: -1 },
                        { x: -1, y: 1 },
                        { x: -1, y: -1 }
                    )
                    break
            }
        })

    range &&
        defaultDirectionsNum.forEach((direction) => {
            let squaresTemp = checkSquaresOneDir({
                currentSquare,
                color,
                range: range,
                moveX: direction.x,
                moveY: direction.y,
                blackPiecesPositions,
                whitePiecesPositions,
                canOnlyTake: direction.canOnlyTake,
            })
            possibleSquares.push(...squaresTemp)
        })

    additionalDirections &&
        additionalDirections.forEach((direction) => {
            //todo: need to add additional directions logic
        })

    return possibleSquares
}

// is move in certain direction is possible
function checkSquaresOneDir({
    currentSquare,
    color,
    range,
    moveX,
    moveY,
    blackPiecesPositions,
    whitePiecesPositions,
    canOnlyTake,
}: CheckSquaresOneDirProps) {
    const possibleSquares = [] as Array<PossibleSquare>

    let squareForCheck = currentSquare
    for (let i = range; i > 0; i--) {
        squareForCheck = {
            x: (squareForCheck.x + moveX) as SquareNum,
            y: (squareForCheck.y + moveY) as SquareNum,
        }
        if (
            squareForCheck.x < 1 ||
            squareForCheck.x > 8 ||
            squareForCheck.y < 1 ||
            squareForCheck.y > 8
        )
            return possibleSquares

        const { isMovePossible, isEnemyPieceOnSquare } = checkMove({
            square: squareForCheck,
            color,
            whitePiecesPositions,
            blackPiecesPositions,
        })
        if (isMovePossible) {
            const possibleSquare = {
                ...squareForCheck,
                isEnemyPieceOnSquare,
            }
            //todo: create canOnlyMove
            // if piece can't move but can take in this direction
            if (canOnlyTake) {
                if (isEnemyPieceOnSquare) possibleSquares.push(possibleSquare)
                return possibleSquares
            }
            // if piece can move and take in this direction
            if (!canOnlyTake) {
                possibleSquares.push(possibleSquare)
            }
        }
        if (isEnemyPieceOnSquare || !isMovePossible) {
            return possibleSquares
        }
    }
    return possibleSquares
}

// is move on certain square is possible
function checkMove(props: checkMoveProps) {
    const { square, color, whitePiecesPositions, blackPiecesPositions } = {
        ...props,
    }
    const checkResult = {
        isMovePossible: false,
        isEnemyPieceOnSquare: false,
    }

    for (let i = whitePiecesPositions.length; i > 0; i--) {
        if (
            whitePiecesPositions[i - 1] !== null &&
            whitePiecesPositions[i - 1].x === square.x &&
            whitePiecesPositions[i - 1].y === square.y
        ) {
            if (color === 'white') return checkResult
            if (color === 'black') {
                checkResult.isMovePossible = true
                checkResult.isEnemyPieceOnSquare = true
                return checkResult
            }
        }
    }
    for (let i = blackPiecesPositions.length; i > 0; i--) {
        if (
            blackPiecesPositions[i - 1] !== null &&
            blackPiecesPositions[i - 1].x === square.x &&
            blackPiecesPositions[i - 1].y === square.y
        ) {
            if (color === 'black') return checkResult
            if (color === 'white') {
                checkResult.isMovePossible = true
                checkResult.isEnemyPieceOnSquare = true

                return checkResult
            }
        }
    }
    checkResult.isMovePossible = true
    return checkResult
}
