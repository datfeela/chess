import {
    PieceColor,
    PieceType,
    Square,
    SquareNum,
} from './../../redux/chessSlice'

export function checkForPieceMoves({
    type,
    color,
    ...props
}: CheckForMovesProps) {
    let possibleMoves = [] as Array<PossibleSquare>

    switch (type) {
        case 'pawn': {
            possibleMoves = checkSquares({
                color,
                range: 1,
                ...props,
                defaultDirections: ['pawnMove'],
            })
            // pawnEnPassant?
            break
        }
        case 'rook': {
            possibleMoves = checkSquares({
                color,
                range: 7,
                ...props,
                defaultDirections: ['straight'],
            })
            break
        }
        case 'knight': {
            possibleMoves = checkSquares({
                color,
                range: 1,
                ...props,
                defaultDirections: ['knightMove'],
            })
            break
        }
        case 'bishop': {
            possibleMoves = checkSquares({
                color,
                range: 7,
                ...props,
                defaultDirections: ['diagonally'],
            })
            break
        }
        case 'queen': {
            possibleMoves = checkSquares({
                color,
                range: 7,
                ...props,
                defaultDirections: ['diagonally', 'straight'],
            })
            break
        }
        case 'king': {
            possibleMoves = checkSquares({
                color,
                range: 1,
                ...props,
                defaultDirections: ['diagonally', 'straight'],
            })
            break
        }
    }

    return possibleMoves
}

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
                            { x: -1, y: 1, canOnlyTake: true },
                        )
                        defaultDirectionsNum.push({ x: 0, y: 1 })
                    }
                    if (color === 'black') {
                        defaultDirectionsNum.push(
                            { x: 1, y: -1, canOnlyTake: true },
                            { x: -1, y: -1, canOnlyTake: true },
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
                        { x: -2, y: -1 },
                    )
                    break
                }
                case 'straight':
                    defaultDirectionsNum.push(
                        { x: 1, y: 0 },
                        { x: -1, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: -1 },
                    )
                    break
                case 'diagonally':
                    defaultDirectionsNum.push(
                        { x: 1, y: 1 },
                        { x: 1, y: -1 },
                        { x: -1, y: 1 },
                        { x: 1, y: -1 },
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
            console.log('add switch')
        })

    return possibleSquares
}

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
            if (canOnlyTake) {
                if (isEnemyPieceOnSquare) possibleSquares.push(possibleSquare)
                return possibleSquares
            }
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
            (blackPiecesPositions[i - 1] !== null &&
                blackPiecesPositions[i - 1].x) === square.x &&
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

interface CheckForMovesProps {
    type: PieceType
    currentSquare: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
}

interface CheckSquaresProps {
    currentSquare: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
    range?: 1 | 7
    defaultDirections?: Array<DefaultMoveDirection>
    additionalDirections?: Array<AdditionalMoveDirection>
}

interface CheckSquaresOneDirProps {
    currentSquare: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
    range: 1 | 2 | 7
    moveX: MoveDirectionNum
    moveY: MoveDirectionNum
    canOnlyTake?: boolean
}

interface checkMoveProps {
    square: Square
    color: PieceColor
    whitePiecesPositions: Array<Square>
    blackPiecesPositions: Array<Square>
}

interface PossibleSquare extends Square {
    isEnemyPieceOnSquare: boolean
}

// interface CheckForDiagonalMovesProps extends CheckForMoveProps {}

type DefaultMoveDirection =
    | 'straight'
    | 'diagonally'
    | 'pawnMove'
    | 'knightMove'
type AdditionalMoveDirection = 'pawnEnPassant' | 'pawnChange' | 'castling'

type MoveDirectionNum = 0 | 1 | -1 | -2 | 2
// direction on X and Y axes normally, -2 | 2 for knight, because his move is direct 2/1
