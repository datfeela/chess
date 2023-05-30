import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    Square,
    makeMove as makeMoveDispatch,
    PieceColor,
} from '../../../redux/chessSlice'
import { checkForPieceMoves } from '../../../func/chess/checkForMoves'
import usePiecesPositions from '../../../hooks/chess/usePiecesPositions'
import React, { useState, useEffect } from 'react'
import Squares from './Squares/Squares'
import { Pieces } from './Pieces/Pieces'
import { handlePieceClickProps } from './Interfaces'
import { ActivePieceNullable, ActiveSquares, MakeMoveProps } from './Interfaces'
import { RootState } from '../../../redux/store'
import {
    selectIsWhiteMove,
    selectLastMove,
    selectPieces,
} from '../../../redux/chessSelectors'
import { PossibleSquareWithCheckmate } from '../../../func/chess/chessHelpersTypes'
import { checkForStalemate } from '../../../func/chess/checkForStalemate'
import { Popup } from './Popup/Popup'

export const Board = React.memo(() => {
    // console.log('board render')

    // state
    const [isCheckmate, setIsCheckmate] = useState(false)
    const [isStalemate, setIsStalemate] = useState(false)
    // active squares are linked to currently active piece: squares on which this piece can move
    const [activePiece, setActivePiece] = useState(null as ActivePieceNullable)
    const [activeSquares, setActiveSquares] = useState(null as ActiveSquares)

    const [piecesCanBeTakenPositions, setPiecesCanBeTakenPositions] = useState(
        [] as Square[]
    )
    const piecesState = useAppSelector((state: RootState) =>
        selectPieces(state)
    )

    const { blackPiecesPositions, whitePiecesPositions } = usePiecesPositions()
    const isWhiteMove = useAppSelector((state: RootState) =>
        selectIsWhiteMove(state)
    )

    const lastMove = useAppSelector((state: RootState) => selectLastMove(state))

    const lastMoveForCheck = {
        color: isWhiteMove ? ('black' as PieceColor) : ('white' as PieceColor),
        isCheck: lastMove.isCheck,
        previousPosition: lastMove.previousPosition,
        newPosition: lastMove.newPosition,
        type: lastMove.type,
    }

    // check for checkmate/stalemate
    useEffect(() => {
        if (!lastMove.piece) {
            setIsCheckmate(false)
            setIsStalemate(false)
            return
        }
        const colorToCheck = isWhiteMove ? 'white' : 'black'
        const piecesToCheck = piecesState[colorToCheck]

        const isActivePlayerMovePossible = checkForStalemate({
            whitePiecesPositions,
            blackPiecesPositions,
            colorToCheck,
            piecesToCheck,
            piecesState,
            lastMove: lastMoveForCheck,
        })

        if (isActivePlayerMovePossible) return
        if (lastMove.isCheck === true) setIsCheckmate(true)
        else setIsStalemate(true)
    }, [lastMove])

    function activatePiece({
        currentSquare,
        type,
        color,
        name,
        isOnStartingPosition,
    }: handlePieceClickProps) {
        if (isCheckmate || isStalemate) return
        setActivePiece({
            name,
            type,
            color,
            currentSquare,
            isOnStartingPosition,
        })
        const { possibleMoves, piecesCanBeTakenCoords } = checkForPieceMoves({
            currentSquare,
            type,
            name,
            color,
            blackPiecesPositions,
            whitePiecesPositions,
            piecesState,
            isOnStartingPosition,
            lastMove: lastMoveForCheck,
            isWithCheckmateCheck: true,
            isWithSelfCheckmateCheck: true,
            isWithAdditionalMovesCheck: true,
            rooksState:
                type === 'king'
                    ? {
                          isRook1OnStartingPosition: piecesState[color].rook1
                              .isOnStartingPosition as boolean,
                          isRook2OnStartingPosition: piecesState[color].rook2
                              .isOnStartingPosition as boolean,
                      }
                    : undefined,
        }) as {
            //when checkForPieceMoves is called without "isWithCheckmateCheck = false", it will always return this type
            possibleMoves: PossibleSquareWithCheckmate[]
            piecesCanBeTakenCoords: Square[]
        }

        //!test
        // console.log('possibleMoves:', possibleMoves)
        // console.log('piecesCanBeTakenCoords:', piecesCanBeTakenCoords)

        setActiveSquares(possibleMoves)
        setPiecesCanBeTakenPositions(piecesCanBeTakenCoords)
    }

    const dispatch = useAppDispatch()
    const makeMove = ({
        activePiece,
        squareCoords,
        isCheck,
        effect,
        enemyPiece,
    }: MakeMoveProps) => {
        if (isCheckmate || isStalemate) return
        dispatch(
            makeMoveDispatch({
                color: activePiece.color,
                piece: activePiece.name,
                newPosition: squareCoords,
                isCheck,
                effect,
                enemyPiece,
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
            w-fit sm:h-full max-w-3xl aspect-square ml-auto mr-auto xl:mr-24
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
                makeMove={makeMove}
            />
            {lastMove.piece && (
                <Popup
                    color={isWhiteMove ? 'black' : 'white'}
                    lastMove={lastMove}
                    isCheckmate={isCheckmate}
                    isStalemate={isStalemate}
                    isWhiteMove={isWhiteMove}
                />
            )}
        </div>
    )
})
