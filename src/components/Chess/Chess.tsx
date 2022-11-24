import styled from 'styled-components'
import { useAppSelector } from '../../hooks/redux'
import { RootState } from '../../redux/store'
import { Board } from './Board/Board'

function Chess(): JSX.Element {
    const isWhiteMove = useAppSelector(
        (state: RootState) => state.chess.isWhiteMove
    )

    return (
        <Wrap className='_ChessMain wrap-main'>
            <div
                className='
                _sidebarLeft
                border border-gray-400 border-solid
                px-4 py-2
            '
            >
                sidebar left
            </div>
            <Board />
            <div
                className='
                _sidebarRight
                border border-gray-400 border-solid
                px-4 py-2
            '
            >
                <span
                    className='
                    _whichMove
                    font-bold text-xl 
                '
                >
                    {isWhiteMove ? 'White move' : 'Black move'}
                </span>
            </div>
        </Wrap>
    )
}

export default Chess

const Wrap = styled.div`
    display: grid;
    gap: 25px;
    grid-template-columns: 1fr 2fr 1fr;
`
