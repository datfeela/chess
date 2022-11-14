import styled from 'styled-components'
import { Board } from './Board/Board'

function Chess(): JSX.Element {
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
                sidebar right
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
