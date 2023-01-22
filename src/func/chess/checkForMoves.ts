import { Pieces, Square, SquareNum } from './../../redux/chessSlice'
import { checkForCheck } from './checkForCheck'
import {
    AreAllSquaresEmptyProps,
    CheckForMovesProps,
    CheckMoveProps,
    CheckSquaresAdditionalDirectionProps,
    CheckSquaresOneDirProps,
    CheckSquaresProps,
    IsCastlingNotInterruptedProps,
    MoveDirectionNum,
    PiecesState,
    PossibleSquare,
    PossibleSquareWithCheckmate,
} from './chessHelpersTypes'

export function checkForPieceMoves({
    isWithCheckmateCheck, //should be true only when called from Board.tsx, or from Board's effects, moves will be calculated recursively with check/checkmate/stalemate check when enabled
    isWithSelfCheckmateCheck,
    isWithAdditionalMovesCheck,
    type,
    name,
    piecesState,
    currentSquare,
    color,
    blackPiecesPositions,
    whitePiecesPositions,
    isOnStartingPosition,
    lastMove,
    rooksState,
}: CheckForMovesProps) {
    let possibleMoves = [] as PossibleSquare[]
    let piecesCanBeTakenCoords = [] as Square[]

    //if piece is taken, it has no moves
    if (currentSquare === null) return { possibleMoves, piecesCanBeTakenCoords }

    const checkSquaresSharedProps = {
        color,
        type,
        currentSquare,
        blackPiecesPositions,
        whitePiecesPositions,
        isOnStartingPosition,
        isWithAdditionalMovesCheck,
        lastMove,
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
                additionalDirections: ['castling'],
                rooksState,
                enemyPiecesState:
                    piecesState?.[color === 'white' ? 'black' : 'white'],
            })
            break
        }
    }

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
    type,
    whitePiecesPositions,
    blackPiecesPositions,
    range,
    defaultDirections,
    additionalDirections,
    isOnStartingPosition,
    isWithAdditionalMovesCheck,
    lastMove,
    rooksState,
    enemyPiecesState,
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

    if (additionalDirections && isWithAdditionalMovesCheck) {
        const squaresTemp = checkSquaresAdditionalDirection({
            currentSquare,
            color,
            additionalDirections,
            blackPiecesPositions,
            whitePiecesPositions,
            isOnStartingPosition,
            lastMove,
            rooksState,
            enemyPiecesState,
        })

        // if piece is pawn, need to replace default directions moves with additional directions moves
        if (type === 'pawn')
            additionalMovesLoop: for (
                let squareTempIndex = 0;
                squareTempIndex < squaresTemp.length;
                squareTempIndex++
            ) {
                let squareAdditional = squaresTemp[squareTempIndex]
                for (let i = 0; i < possibleSquares.length; i++) {
                    if (
                        squareAdditional.x === possibleSquares[i].x &&
                        squareAdditional.y === possibleSquares[i].y
                    ) {
                        possibleSquares.splice(i, 1)
                        possibleSquares.push(squareAdditional)
                        continue additionalMovesLoop
                    }
                }
                possibleSquares.push(squareAdditional)
            }
        else possibleSquares.push(...squaresTemp)
    }

    return possibleSquares
}

function checkSquaresAdditionalDirection({
    currentSquare,
    color,
    additionalDirections,
    blackPiecesPositions,
    whitePiecesPositions,
    isOnStartingPosition,
    lastMove,
    rooksState,
    enemyPiecesState,
}: CheckSquaresAdditionalDirectionProps) {
    const possibleSquares = [] as Array<PossibleSquare>
    additionalDirections.forEach((direction) => {
        switch (direction) {
            case 'pawnFirstMove':
                // !!!! should overwrite default move
                if (isOnStartingPosition) {
                    let squaresTemp = checkSquaresOneDir({
                        currentSquare,
                        color,
                        range: 2,
                        moveX: 0,
                        moveY: color === 'white' ? 1 : -1,
                        blackPiecesPositions,
                        whitePiecesPositions,
                    })
                    possibleSquares.push(...squaresTemp)
                }
                break
            case 'castling':
                if (
                    !enemyPiecesState ||
                    !isOnStartingPosition ||
                    lastMove?.isCheck ||
                    (!rooksState?.isRook1OnStartingPosition &&
                        !rooksState?.isRook2OnStartingPosition)
                )
                    break

                let isLeftCastlingPossible =
                    rooksState?.isRook1OnStartingPosition
                let isRightCastlingPossible =
                    rooksState?.isRook2OnStartingPosition

                // check if there are any pieces between king and rooks
                const allPiecesPositions = [
                    ...blackPiecesPositions,
                    ...whitePiecesPositions,
                ]
                if (
                    isLeftCastlingPossible &&
                    areAllSquaresEmpty({
                        piecesPositions: allPiecesPositions,
                        squares: [
                            { x: 2, y: currentSquare.y },
                            { x: 3, y: currentSquare.y },
                            { x: 4, y: currentSquare.y },
                        ],
                    }) === false
                )
                    isLeftCastlingPossible = false

                if (
                    isRightCastlingPossible &&
                    areAllSquaresEmpty({
                        piecesPositions: allPiecesPositions,
                        squares: [
                            { x: 6, y: currentSquare.y },
                            { x: 7, y: currentSquare.y },
                        ],
                    }) === false
                )
                    isRightCastlingPossible = false

                // check if any square between king and rooks is attacked by opposing piece
                // for (let name in enemyPiecesState) {
                //     if (!isLeftCastlingPossible && !isRightCastlingPossible)
                //         break

                //     const possibleEnemyMoves = checkForPieceMoves({
                //         isWithCheckmateCheck: false,
                //         isWithSelfCheckmateCheck: false,
                //         isWithAdditionalMovesCheck: false,
                //         blackPiecesPositions,
                //         whitePiecesPositions,
                //         color: color === 'white' ? 'black' : 'white',
                //         currentSquare: enemyPiecesState[name as keyof Pieces]
                //             .square as Square,
                //         name: name as keyof Pieces,
                //         type: enemyPiecesState[name as keyof Pieces].type,
                //     }).possibleMoves

                //     for (let i = 0; i < possibleEnemyMoves.length; i++) {
                //         if (possibleEnemyMoves[i].y !== currentSquare.y)
                //             continue
                //         if (
                //             isLeftCastlingPossible &&
                //             (possibleEnemyMoves[i].x === 2 ||
                //                 possibleEnemyMoves[i].x === 3 ||
                //                 possibleEnemyMoves[i].x === 4)
                //         )
                //             isLeftCastlingPossible = false
                //         if (
                //             isRightCastlingPossible &&
                //             (possibleEnemyMoves[i].x === 6 ||
                //                 possibleEnemyMoves[i].x === 7)
                //         )
                //             isRightCastlingPossible = false
                //     }
                // }
                const isCastlingNotInterruptedResult = isCastlingNotInterrupted(
                    {
                        blackPiecesPositions,
                        color,
                        currentSquare,
                        enemyPiecesState,
                        isLeftCastlingPossible,
                        isRightCastlingPossible,
                        whitePiecesPositions,
                    }
                )

                isLeftCastlingPossible = isCastlingNotInterruptedResult.left
                isRightCastlingPossible = isCastlingNotInterruptedResult.right

                isLeftCastlingPossible &&
                    possibleSquares.push({
                        x: 3,
                        y: currentSquare.y,
                        isEnemyPieceOnSquare: false,
                        effect: 'castlingLeft',
                    })
                isRightCastlingPossible &&
                    possibleSquares.push({
                        x: 7,
                        y: currentSquare.y,
                        isEnemyPieceOnSquare: false,
                        effect: 'castlingRight',
                    })

                break
            // case 'pawnChange'
            // case 'pawnEnPassant':
            default:
                break
        }
    })

    return possibleSquares

    // const { isMovePossible, isEnemyPieceOnSquare } = checkMove({
    //     square: squareForCheck,
    //     color,
    //     whitePiecesPositions,
    //     blackPiecesPositions,
    // })
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
function checkMove(props: CheckMoveProps) {
    const { square, color, whitePiecesPositions, blackPiecesPositions } = props

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

function areAllSquaresEmpty({
    piecesPositions,
    squares,
}: AreAllSquaresEmptyProps) {
    for (let squareIndex = 0; squareIndex < squares.length; squareIndex++) {
        let squareToCheck = squares[squareIndex]
        for (let i = 0; i < piecesPositions.length; i++) {
            if (
                piecesPositions[i].x === squareToCheck.x &&
                piecesPositions[i].y === squareToCheck.y
            )
                return false
        }
    }
    return true
}

function isCastlingNotInterrupted({
    enemyPiecesState,
    isLeftCastlingPossible,
    isRightCastlingPossible,
    blackPiecesPositions,
    whitePiecesPositions,
    color,
    currentSquare,
}: IsCastlingNotInterruptedProps) {
    const isCastlingPossibleTemp = {
        left: isLeftCastlingPossible,
        right: isRightCastlingPossible,
    }
    for (let name in enemyPiecesState) {
        if (!isCastlingPossibleTemp.left && !isCastlingPossibleTemp.right) break

        const possibleEnemyMoves = checkForPieceMoves({
            isWithCheckmateCheck: false,
            isWithSelfCheckmateCheck: false,
            isWithAdditionalMovesCheck: false,
            blackPiecesPositions,
            whitePiecesPositions,
            color: color === 'white' ? 'black' : 'white',
            currentSquare: enemyPiecesState[name as keyof Pieces]
                .square as Square,
            name: name as keyof Pieces,
            type: enemyPiecesState[name as keyof Pieces].type,
        }).possibleMoves

        for (let i = 0; i < possibleEnemyMoves.length; i++) {
            if (possibleEnemyMoves[i].y !== currentSquare.y) continue
            if (
                isCastlingPossibleTemp.left &&
                (possibleEnemyMoves[i].x === 2 ||
                    possibleEnemyMoves[i].x === 3 ||
                    possibleEnemyMoves[i].x === 4)
            )
                isCastlingPossibleTemp.left = false
            if (
                isCastlingPossibleTemp.right &&
                (possibleEnemyMoves[i].x === 6 || possibleEnemyMoves[i].x === 7)
            )
                isCastlingPossibleTemp.right = false
        }
    }
    return isCastlingPossibleTemp
}
