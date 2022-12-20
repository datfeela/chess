import { useAppSelector } from '../../../hooks/redux'
import { selectIsWhiteMove } from '../../../redux/chessSelectors'
import { RootState } from '../../../redux/store'
import { MovesHistory } from './MovesHistory/MovesHistory'

export const Sidebar = () => {
    const isWhiteMove = useAppSelector((state: RootState) =>
        selectIsWhiteMove(state)
    )

    return (
        <div
            className='
                _sidebar
                max-h-full overflow-y-scroll
                px-4 py-2 my-auto 
                border border-gray-400 border-solid
            '
        >
            <span
                className='
                    _whichMove
                    block mb-3
                    font-bold text-xl 
                '
            >
                {isWhiteMove ? 'White move' : 'Black move'}
            </span>
            <MovesHistory />
        </div>
    )
}
