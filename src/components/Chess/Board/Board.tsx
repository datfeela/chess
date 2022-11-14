import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    Pieces,
    SquareNum,
    Square as SquareType,
    PieceColor,
} from '../../../redux/chessSlice'
import { RootState } from '../../../redux/store'
import { ActivatePieceProps, Piece } from '../Piece/Piece'
import { checkForPieceMoves } from '../../../func/chess/checkForMoves'
import { usePiecesPositions } from '../../../hooks/chessHooks'
import { Square } from '../Square/Square'
import { useState, useCallback } from 'react'

export const Board: React.FC = () => {
    // console.log('board render')

    const dispatch = useAppDispatch()

    // Pieces
    const pieces = useAppSelector((state: RootState) => state.chess.pieces)
    const whitePieces: Array<JSX.Element> = []
    const blackPieces: Array<JSX.Element> = []
    const { blackPiecesPositions, whitePiecesPositions } = usePiecesPositions()
    const [activePiece, setActivePiece] = useState(null as ActivePiece)

    const activatePiece = ({
        currentSquare,
        type,
        color,
        name,
    }: ActivatePieceProps) => {
        setActivePiece({ name: name, color: color })
        const possibleMoves = checkForPieceMoves({
            currentSquare: currentSquare,
            type: type,
            color: color,
            blackPiecesPositions: blackPiecesPositions,
            whitePiecesPositions: whitePiecesPositions,
        })
        setActiveSquares(possibleMoves)
    }

    Object.entries(pieces.white).forEach((piece) => {
        whitePieces.push(
            <Piece
                key={`white${piece[0]}`}
                name={piece[0] as keyof Pieces}
                type={piece[1].type}
                square={piece[1].square}
                color={'white'}
                activatePiece={activatePiece}
            />,
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
                activatePiece={activatePiece}
            />,
        )
    })

    // Squares
    let squares = []
    let [activeSquares, setActiveSquares] = useState(null as ActiveSquares)

    // squares render
    let isSquareWhite = true

    for (let y = 8; y > 0; y--) {
        isSquareWhite = !isSquareWhite
        for (let x = 1; x < 9; x++) {
            let isSquareActive = false
            if (activeSquares) {
                activeSquares.forEach((square) => {
                    x === square.x && y === square.y && (isSquareActive = true)
                })
            }
            isSquareWhite = !isSquareWhite
            squares.push(
                <Square
                    key={`${x}${y}`}
                    isSquareWhite={isSquareWhite}
                    isSquareActive={isSquareActive}
                    x={x as SquareNum}
                    y={y as SquareNum}
                />,
            )
        }
    }

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
                absolute w-full h-full z-0
                top-0 left-0
            '
            >
                {whitePieces}
                {blackPieces}
            </div>
        </div>
    )
}

type ActiveSquares = null | SquareType[]

type ActivePiece = null | { name: keyof Pieces; color: PieceColor }
