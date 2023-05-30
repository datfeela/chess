import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../../../hooks/redux'
import {
    selectIsWhiteMove,
    selectLastMove,
    selectMovesHistory,
} from '../../../../redux/chessSelectors'
import { RootState } from '../../../../redux/store'
import { Move } from '../Move/Move'

export const MovesHistory = () => {
    const { moves, movesCount } = useAppSelector((state: RootState) =>
        selectMovesHistory(state)
    )

    const lastMove = useAppSelector((state: RootState) => selectLastMove(state))
    const isWhiteMove = useAppSelector((state: RootState) =>
        selectIsWhiteMove(state)
    )

    const historyElements: JSX.Element[] = []

    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const movesEls = wrapRef.current?.children

        if (!movesEls) return

        movesEls[movesCount]?.scrollIntoView({ behavior: 'smooth' })
    }, [isWhiteMove])

    for (let i in moves) {
        const move = moves[i]
        historyElements.push(
            <MoveWrap>
                <span className='_moveNum font-bold'>{i}</span>
                <Move
                    move={move.white}
                    imgName={`/chess/pieces/w${move.white.type[0].toUpperCase()}${move.white.type.slice(
                        1
                    )}.svg`}
                    color='white'
                />
                <Move
                    move={move.black}
                    imgName={`/chess/pieces/w${move.black.type[0].toUpperCase()}${move.black.type.slice(
                        1
                    )}.svg`}
                    color='black'
                />
            </MoveWrap>
        )
    }

    return (
        <div
            ref={wrapRef}
            className='
                _movesHistory
                py-2
                text-lg
            '
        >
            {historyElements}
            {!isWhiteMove ? (
                <MoveWrap>
                    <span className='_moveNum font-bold'>{movesCount + 1}</span>
                    <Move
                        move={lastMove}
                        imgName={`/chess/pieces/w${lastMove.type[0].toUpperCase()}${lastMove.type.slice(
                            1
                        )}.svg`}
                        color='white'
                    />
                </MoveWrap>
            ) : null}
        </div>
    )
}

const MoveWrap = styled.div`
    display: grid;
    align-items: center;
    gap: 10px;
    grid-template-columns: auto 1fr 1fr;
    padding: 8px 0;
`
