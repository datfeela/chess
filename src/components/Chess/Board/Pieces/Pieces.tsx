import { useAppSelector } from '../../../../hooks/redux'
import {
    selectIsWhiteMove,
    selectPieces,
} from '../../../../redux/chessSelectors'
import {
    PieceColor,
    Pieces as tPieces,
    Square,
} from '../../../../redux/chessSlice'
import { RootState } from '../../../../redux/store'
import {
    ActivePieceNullable,
    ActiveSquares,
    handlePieceClickProps,
    MakeMoveProps,
} from '../Interfaces'
import { Piece } from './Piece/Piece'

export const Pieces = ({
    activeSquares,
    activePiece,
    activatePiece,
    piecesCanBeTakenPositions,
    makeMove,
}: PiecesProps) => {
    // state
    const isWhiteMove = useAppSelector((state: RootState) =>
        selectIsWhiteMove(state)
    )
    const piecesState = useAppSelector((state: RootState) =>
        selectPieces(state)
    )

    // functions
    const handlePieceClick = (props: handlePieceClickProps) => {
        const { color, currentSquare, name } = props
        const isAllowedToMove =
            (isWhiteMove && color === 'white') ||
            (!isWhiteMove && color === 'black')

        if (isAllowedToMove) activatePiece(props)
        if (!isAllowedToMove) {
            if (!activeSquares || !activePiece) return
            for (let square of activeSquares) {
                if (
                    square.x === currentSquare.x &&
                    square.y === currentSquare.y
                ) {
                    makeMove({
                        squareCoords: currentSquare,
                        activePiece,
                        enemyPiece: { color, piece: name },
                        isCheck: square.isCheck,
                        effect: square.effect,
                    })
                }
            }
        }
    }

    const createPiecesElements = (color: PieceColor) => {
        const piecesElements: Array<JSX.Element> = []
        let piecesWithColor =
            color === 'white' ? piecesState.white : piecesState.black

        for (let pieceKey in piecesWithColor) {
            const pieceProps = piecesWithColor[pieceKey as keyof tPieces]

            if (pieceProps.isTaken) continue

            let isPieceCanBeTaken = false
            for (let pos of piecesCanBeTakenPositions) {
                if (
                    pos.x === pieceProps.square?.x &&
                    pos.y === pieceProps.square?.y
                )
                    isPieceCanBeTaken = true
            }

            const isPieceActive =
                activePiece?.currentSquare.x === pieceProps.square?.x &&
                activePiece?.currentSquare.y === pieceProps.square?.y

            piecesElements.push(
                <Piece
                    key={`${color}${pieceKey}`}
                    name={pieceKey as keyof tPieces}
                    type={pieceProps.type}
                    square={pieceProps.square}
                    color={color}
                    handlePieceClick={handlePieceClick}
                    isPieceActive={isPieceActive}
                    isPieceCanBeTaken={isPieceCanBeTaken}
                    isOnStartingPosition={pieceProps.isOnStartingPosition}
                />
            )
        }

        return piecesElements
    }

    const whitePieces: Array<JSX.Element> = createPiecesElements('white')
    const blackPieces: Array<JSX.Element> = createPiecesElements('black')

    return (
        <div
            className='
                _Pieces
                w-0 h-0
            '
        >
            {whitePieces}
            {blackPieces}
        </div>
    )
}

interface PiecesProps {
    activePiece: ActivePieceNullable
    activatePiece: ({
        currentSquare,
        type,
        color,
        name,
    }: handlePieceClickProps) => void
    activeSquares: ActiveSquares
    piecesCanBeTakenPositions: Square[]
    makeMove: (props: MakeMoveProps) => void
}
