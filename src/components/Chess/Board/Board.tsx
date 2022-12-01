import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    Pieces,
    SquareNum,
    Square as SquareType,
    PieceColor,
    makeMove,
    Piece as PieceType,
} from '../../../redux/chessSlice'
import { RootState } from '../../../redux/store'
import { handlePieceClickProps, Piece } from '../Piece/Piece'
import { checkForPieceMoves } from '../../../func/chess/checkForMoves'
import { usePiecesPositions } from '../../../hooks/chessHooks'
import { Square } from '../Square/Square'
import React, { useState } from 'react'
import { selectIsWhiteMove, selectPieces } from '../../../redux/chessSelectors'
import { posix } from 'path'

export const Board = React.memo(() => {
    // console.log('board render')

    // TODO: refactor component(actual move)

    const dispatch = useAppDispatch()

    // State
    // Squares state
    const [activeSquares, setActiveSquares] = useState(null as ActiveSquares)

    // Pieces state
    const pieces = useAppSelector((state: RootState) => selectPieces(state))
    const isWhiteMove = useAppSelector((state: RootState) =>
        selectIsWhiteMove(state)
    )
    const whitePieces: Array<JSX.Element> = []
    const blackPieces: Array<JSX.Element> = []
    const { blackPiecesPositions, whitePiecesPositions } = usePiecesPositions()
    const [activePiece, setActivePiece] = useState(null as ActivePiece)
    const [piecesCanBeTakenPositions, setPiecesCanBeTakenPositions] = useState(
        [] as SquareType[]
    )

    // Pieces functions
    const handlePieceClick = (props: handlePieceClickProps) => {
        const { color, currentSquare, ...rest } = props
        const isAllowedToMove =
            (isWhiteMove && color === 'white') ||
            (!isWhiteMove && color === 'black')

        if (isAllowedToMove) activatePiece(props)
        if (!isAllowedToMove) {
            if (!activeSquares) return
            for (let square of activeSquares) {
                if (
                    square.x === currentSquare.x &&
                    square.y === currentSquare.y
                ) {
                    console.log('hello i want eat...')
                }
            }
        }

        function activatePiece({
            currentSquare,
            type,
            color,
            name,
        }: handlePieceClickProps) {
            if (
                (isWhiteMove && color === 'white') ||
                (!isWhiteMove && color === 'black')
            ) {
                setActivePiece({ name, color, currentSquare })
                const { possibleMoves, piecesCanBeTakenCoords } =
                    checkForPieceMoves({
                        currentSquare: currentSquare,
                        type: type,
                        color: color,
                        blackPiecesPositions: blackPiecesPositions,
                        whitePiecesPositions: whitePiecesPositions,
                    })
                setActiveSquares(possibleMoves)
                setPiecesCanBeTakenPositions(piecesCanBeTakenCoords)
            }
        }
    }

    //Pieces render
    // Object.entries(pieces.white).forEach((piece) => {
    //     const pieceName = piece[0]
    //     const pieceProps = piece[1]
    //     let isPieceCanBeTaken = false
    //     for (let pos of piecesCanBeTakenPositions) {
    //         if (pos.x === pieceProps.square.x && pos.y === pieceProps.square.y)
    //             console.log('found', pos)
    //     }
    //     whitePieces.push(
    //         <Piece
    //             key={`white${pieceName}`}
    //             name={pieceName as keyof Pieces}
    //             type={pieceProps.type}
    //             square={pieceProps.square}
    //             color={'white'}
    //             handlePieceClick={handlePieceClick}
    //             activePieceCurSquare={activePiece?.currentSquare}
    //             piecesCanBeTakenPositions={piecesCanBeTakenPositions}
    //         />
    //     )
    // })

    for (let pieceKey in pieces.white) {
        const pieceProps = pieces.white[pieceKey as keyof Pieces]

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

        whitePieces.push(
            <Piece
                key={`white${pieceKey}`}
                name={pieceKey as keyof Pieces}
                type={pieceProps.type}
                square={pieceProps.square}
                color={'white'}
                handlePieceClick={handlePieceClick}
                isPieceActive={isPieceActive}
                isPieceCanBeTaken={isPieceCanBeTaken}
            />
        )
    }

    for (let pieceKey in pieces.black) {
        const pieceProps = pieces.black[pieceKey as keyof Pieces]

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

        whitePieces.push(
            <Piece
                key={`black${pieceKey}`}
                name={pieceKey as keyof Pieces}
                type={pieceProps.type}
                square={pieceProps.square}
                color={'black'}
                handlePieceClick={handlePieceClick}
                isPieceActive={isPieceActive}
                isPieceCanBeTaken={isPieceCanBeTaken}
            />
        )
    }

    // Squares functions
    const handleSquareClick: any = (props: handleSquareClickProps) => {
        const { squareCoords } = props
        if (!activeSquares || !activePiece) return
        for (let square of activeSquares) {
            if (square.x === squareCoords.x && square.y === squareCoords.y) {
                dispatch(
                    makeMove({
                        color: activePiece.color,
                        piece: activePiece.name,
                        newPosition: squareCoords,
                    })
                )
                setActivePiece(null)
                setActiveSquares([])
                setPiecesCanBeTakenPositions([])
            }
        }
    }

    //todo: refactor!! get this outta here
    const createSquares = () => {
        let squares = []
        for (let y = 8; y > 0; y--) {
            isSquareWhite = !isSquareWhite
            for (let x = 1; x < 9; x++) {
                let isSquareActive = false
                let isEnemyPieceOnSquare = false
                activeSquares?.forEach((square) => {
                    if (x === square.x && y === square.y) {
                        isSquareActive = true
                        isEnemyPieceOnSquare = square.isEnemyPieceOnSquare
                    }
                })

                const isPieceOnSquareActive =
                    activePiece?.currentSquare.x === x &&
                    activePiece?.currentSquare.y === y

                isSquareWhite = !isSquareWhite
                squares.push(
                    <Square
                        key={`${x}${y}`}
                        isSquareWhite={isSquareWhite}
                        isSquareActive={isSquareActive}
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

    // squares render
    let isSquareWhite = true
    const squares = createSquares()

    return (
        <div
            className='
            _Board 
            relative
            w-full max-w-3xl mx-auto
        '
        >
            <div
                className='
                _Squares chessGrid
                relative z-0
            '
            >
                {squares}
            </div>
            <div
                className='
                _Pieces
                w-0 h-0
            '
            >
                {whitePieces}
                {blackPieces}
            </div>
        </div>
    )
})

interface ActiveSquare extends SquareType {
    isEnemyPieceOnSquare: boolean
}

type ActiveSquares = null | ActiveSquare[]
type ActivePiece = null | {
    name: keyof Pieces
    color: PieceColor
    currentSquare: SquareType
}
export interface handleSquareClickProps {
    squareCoords: SquareType
}
