import { useAppDispatch } from '../../../hooks/redux'
import { Square, makeMove as makeMoveDispatch } from '../../../redux/chessSlice'
import { checkForPieceMoves } from '../../../func/chess/checkForMoves'
import usePiecesPositions from '../../../hooks/chess/usePiecesPositions'
import React, { useState } from 'react'
import Squares from './Squares/Squares'
import { Pieces } from './Pieces/Pieces'
import { handlePieceClickProps } from './Interfaces'
import { ActivePieceNullable, ActiveSquares, MakeMoveProps } from './Interfaces'

export const Board = React.memo(() => {
    // console.log('board render')

    // Squares state
    // active squares are linked to active piece
    // squares on which piece can move
    const [activeSquares, setActiveSquares] = useState(null as ActiveSquares)
    const [activePiece, setActivePiece] = useState(null as ActivePieceNullable)
    const [piecesCanBeTakenPositions, setPiecesCanBeTakenPositions] = useState(
        [] as Square[]
    )

    const { blackPiecesPositions, whitePiecesPositions } = usePiecesPositions()

    function activatePiece({
        currentSquare,
        type,
        color,
        name,
    }: handlePieceClickProps) {
        setActivePiece({ name, color, currentSquare })
        const { possibleMoves, piecesCanBeTakenCoords } = checkForPieceMoves({
            currentSquare: currentSquare,
            type: type,
            color: color,
            blackPiecesPositions: blackPiecesPositions,
            whitePiecesPositions: whitePiecesPositions,
        })
        setActiveSquares(possibleMoves)
        setPiecesCanBeTakenPositions(piecesCanBeTakenCoords)
    }

    const dispatch = useAppDispatch()
    const makeMove = ({ activePiece, squareCoords }: MakeMoveProps) => {
        dispatch(
            makeMoveDispatch({
                color: activePiece?.color,
                piece: activePiece?.name,
                newPosition: squareCoords,
            })
        )
        setActivePiece(null)
        setActiveSquares([])
        setPiecesCanBeTakenPositions([])
    }

    return (
        <div
            className='
            _Board 
            relative
            w-full max-w-3xl mx-auto
        '
        >
            <Squares
                activePiece={activePiece}
                activeSquares={activeSquares}
                makeMove={makeMove}
            />
            <Pieces
                activePiece={activePiece}
                activatePiece={activatePiece}
                activeSquares={activeSquares}
                piecesCanBeTakenPositions={piecesCanBeTakenPositions}
            />
        </div>
    )
})
