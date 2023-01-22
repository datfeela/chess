import { SquareNum } from '../../../../redux/chessSlice'
import {
    ActivePieceNullable,
    ActiveSquares,
    MakeMoveProps,
} from '../Interfaces'
import { Square } from './Square/Square'
import { Square as SquareType } from '../../../../redux/chessSlice'
import { useAppSelector } from '../../../../hooks/redux'
import { RootState } from '../../../../redux/store'
import { selectLastMove } from '../../../../redux/chessSelectors'

export default function Squares({
    activeSquares,
    activePiece,
    makeMove,
}: SquaresProps) {
    // state
    const lastMove = useAppSelector((state: RootState) => selectLastMove(state))
    const lastMoveSquares = Object.keys(lastMove).length
        ? [lastMove.previousPosition, lastMove.newPosition]
        : null

    // functions
    const handleSquareClick: any = (props: handleSquareClickProps) => {
        const { squareCoords } = props
        if (!activeSquares || !activePiece) return

        for (let square of activeSquares) {
            if (square.x === squareCoords.x && square.y === squareCoords.y)
                //! makeMove({ activePiece, squareCoords })
                makeMove({
                    activePiece,
                    squareCoords,
                    isCheck: square.isCheck,
                    effect: square.effect,
                })
        }
    }

    const createSquares = () => {
        let squares = []
        let isSquareWhite = true

        for (let y = 8; y > 0; y--) {
            isSquareWhite = !isSquareWhite
            for (let x = 1; x < 9; x++) {
                // is square active right now
                let isSquareActive = false
                let isEnemyPieceOnSquare = false
                activeSquares?.forEach((square) => {
                    if (x === square.x && y === square.y) {
                        isSquareActive = true
                        isEnemyPieceOnSquare = square.isEnemyPieceOnSquare
                    }
                })

                // is piece on square active
                const isPieceOnSquareActive =
                    activePiece?.currentSquare.x === x &&
                    activePiece?.currentSquare.y === y

                // was square active last turn
                let wasSquareActiveLastTurn = false
                lastMoveSquares?.forEach((square) => {
                    if (x === square.x && y === square.y) {
                        wasSquareActiveLastTurn = true
                    }
                })

                isSquareWhite = !isSquareWhite
                squares.push(
                    <Square
                        key={`${x}${y}`}
                        isSquareWhite={isSquareWhite}
                        isSquareActive={isSquareActive}
                        wasSquareActiveLastTurn={wasSquareActiveLastTurn}
                        isEnemyPieceOnSquare={isEnemyPieceOnSquare}
                        isPieceOnSquareActive={isPieceOnSquareActive}
                        x={x as SquareNum}
                        y={y as SquareNum}
                        handleSquareClick={handleSquareClick}
                    />
                )
            }
        }
        return squares
    }

    // render
    const squares = createSquares()

    return (
        <div
            className='
                _Squares chessGrid
                relative z-0
            '
        >
            {squares}
        </div>
    )
}

interface SquaresProps {
    activeSquares: ActiveSquares
    activePiece: ActivePieceNullable
    makeMove: ({ activePiece, squareCoords }: MakeMoveProps) => void
}

export interface handleSquareClickProps {
    squareCoords: SquareType
}
