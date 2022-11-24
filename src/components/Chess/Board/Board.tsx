import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    Pieces,
    SquareNum,
    Square as SquareType,
    PieceColor,
    makeMove,
} from '../../../redux/chessSlice'
import { RootState } from '../../../redux/store'
import { handlePieceClickProps, Piece } from '../Piece/Piece'
import { checkForPieceMoves } from '../../../func/chess/checkForMoves'
import { usePiecesPositions } from '../../../hooks/chessHooks'
import { Square } from '../Square/Square'
import React, { useState, useCallback, useEffect } from 'react'
import { selectIsWhiteMove, selectPieces } from '../../../redux/chessSelectors'

export const Board = React.memo(() => {
    // console.log('board render')
    // TODO: refactor component(actual move), rename pieces,
    // TODO: display which move is now
    // TODO: make a commit pls

    const dispatch = useAppDispatch()

    // Pieces state
    const pieces = useAppSelector((state: RootState) => selectPieces(state))
    const isWhiteMove = useAppSelector((state: RootState) =>
        selectIsWhiteMove(state)
    )
    const whitePieces: Array<JSX.Element> = []
    const blackPieces: Array<JSX.Element> = []
    const { blackPiecesPositions, whitePiecesPositions } = usePiecesPositions()
    const [activePiece, setActivePiece] = useState(null as ActivePiece)

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
                    console.log('hello')
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
                const possibleMoves = checkForPieceMoves({
                    currentSquare: currentSquare,
                    type: type,
                    color: color,
                    blackPiecesPositions: blackPiecesPositions,
                    whitePiecesPositions: whitePiecesPositions,
                })
                setActiveSquares(possibleMoves)
            }
        }
    }

    //Pieces render
    Object.entries(pieces.white).forEach((piece) => {
        whitePieces.push(
            <Piece
                key={`white${piece[0]}`}
                name={piece[0] as keyof Pieces}
                type={piece[1].type}
                square={piece[1].square}
                color={'white'}
                handlePieceClick={handlePieceClick}
            />
        )
    })
    Object.entries(pieces.black).forEach((piece) => {
        blackPieces.push(
            <Piece
                key={`white${piece[0]}`}
                name={piece[0] as keyof Pieces}
                type={piece[1].type}
                square={piece[1].square}
                color={'black'}
                handlePieceClick={handlePieceClick}
            />
        )
    })

    // Squares state
    let squares = []
    let [activeSquares, setActiveSquares] = useState(null as ActiveSquares)

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
                setActiveSquares(null)
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
                activeSquares?.forEach((square) => {
                    x === square.x && y === square.y && (isSquareActive = true)
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
    squares = createSquares()

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

type ActiveSquares = null | SquareType[]
type ActivePiece = null | {
    name: keyof Pieces
    color: PieceColor
    currentSquare: SquareType
}
export interface handleSquareClickProps {
    squareCoords: SquareType
}
