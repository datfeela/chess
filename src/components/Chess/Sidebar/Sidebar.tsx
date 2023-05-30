import { useAppSelector } from '../../../hooks/redux'
import {
    selectIsWhiteMove,
    selectMovesHistory,
} from '../../../redux/chessSelectors'
import { RootState } from '../../../redux/store'
import { MovesHistory } from './MovesHistory/MovesHistory'

export const Sidebar = () => {
    const isWhiteMove = useAppSelector((state: RootState) =>
        selectIsWhiteMove(state)
    )

    const movesCount = useAppSelector((state: RootState) =>
        selectMovesHistory(state)
    ).movesCount

    return (
        <div
            className='
                _sidebar
                scrollbar
                overflow-y-scroll 
                h-full xl:max-h-3/5
                px-4
                border border-stone-900 border-solid
                bg-slate-800
            '
        >
            <div
                className='
                sticky bg-slate-800
                py-2
                border-solid border-b border-white
                top-0 w-full
                flex justify-between items-center
            '
            >
                <span
                    className='
                    _whichMove
                    font-bold text-xl 
                '
                >
                    {isWhiteMove ? 'Ход белых' : 'Ход черных'}
                </span>
                <span
                    className='
                    font-bold text-xl
                '
                >
                    Move {movesCount + 1}
                </span>
            </div>

            <MovesHistory />
        </div>
    )
}
