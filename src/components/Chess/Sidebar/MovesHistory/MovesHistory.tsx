import { useAppSelector } from '../../../../hooks/redux'
import { selectMovesHistory } from '../../../../redux/chessSelectors'
import { RootState } from '../../../../redux/store'

export const MovesHistory = () => {
    const history = useAppSelector((state: RootState) =>
        selectMovesHistory(state)
    )

    const historyElements: JSX.Element[] = []
    console.log(history.moves)

    for (let i in history.moves) {
        const move = history.moves[i]
        historyElements.push(
            <div>
                <span className='_moveNum'>{i} | </span>
                <span
                    className='
                    _moveWhite
                '
                >
                    {`${move.white.type} `}
                    {`${move.white.previousPosition.x}-${move.white.previousPosition.y} -> `}
                    {`${move.white.newPosition.x}-${move.white.newPosition.y} ||| `}
                </span>
                <span
                    className='
                    _moveBlack
                '
                >
                    {`${move.black.type} `}
                    {`${move.black.previousPosition.x}-${move.black.previousPosition.y} -> `}
                    {`${move.black.newPosition.x}-${move.black.newPosition.y}`}
                </span>
            </div>
        )
    }

    return (
        <div
            className='
                _movesHistory
                py-2
            '
        >
            <span className='block mb-3'>Move {history.movesCount + 1}</span>
            {historyElements}
        </div>
    )
}
