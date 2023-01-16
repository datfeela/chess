import { AppDispatch, RootState } from './store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ChessState = {
    pieces: {
        white: {
            rook1: {
                type: 'rook',
                square: {
                    y: 1,
                    x: 1,
                },
                isOnStartingPosition: true,
            },
            knight1: {
                type: 'knight',
                square: {
                    y: 1,
                    x: 2,
                },
            },
            bishop1: {
                type: 'bishop',
                square: {
                    y: 1,
                    x: 3,
                },
            },
            queen: {
                type: 'queen',
                square: {
                    y: 1,
                    x: 4,
                },
            },
            king: {
                type: 'king',
                square: {
                    y: 1,
                    x: 5,
                },
                isOnStartingPosition: true,
            },
            bishop2: {
                type: 'bishop',
                square: {
                    y: 1,
                    x: 6,
                },
            },
            knight2: {
                type: 'knight',
                square: {
                    y: 1,
                    x: 7,
                },
            },
            rook2: {
                type: 'rook',
                square: {
                    y: 1,
                    x: 8,
                },
                isOnStartingPosition: true,
            },
            pawn1: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 1,
                },
                isOnStartingPosition: true,
            },
            pawn2: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 2,
                },
                isOnStartingPosition: true,
            },
            pawn3: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 3,
                },
                isOnStartingPosition: true,
            },
            pawn4: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 4,
                },
                isOnStartingPosition: true,
            },
            pawn5: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 5,
                },
                isOnStartingPosition: true,
            },
            pawn6: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 6,
                },
                isOnStartingPosition: true,
            },
            pawn7: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 7,
                },
                isOnStartingPosition: true,
            },
            pawn8: {
                type: 'pawn',
                square: {
                    y: 2,
                    x: 8,
                },
                isOnStartingPosition: true,
            },
        },
        black: {
            rook1: {
                type: 'rook',
                square: {
                    y: 8,
                    x: 1,
                },
            },
            knight1: {
                type: 'knight',
                square: {
                    y: 8,
                    x: 2,
                },
            },
            bishop1: {
                type: 'bishop',
                square: {
                    y: 8,
                    x: 3,
                },
            },
            queen: {
                type: 'queen',
                square: {
                    y: 8,
                    x: 4,
                },
            },
            king: {
                type: 'king',
                square: {
                    y: 8,
                    x: 5,
                },
            },
            bishop2: {
                type: 'bishop',
                square: {
                    y: 8,
                    x: 6,
                },
            },
            knight2: {
                type: 'knight',
                square: {
                    y: 8,
                    x: 7,
                },
            },
            rook2: {
                type: 'rook',
                square: {
                    y: 8,
                    x: 8,
                },
            },
            pawn1: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 1,
                },
            },
            pawn2: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 2,
                },
            },
            pawn3: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 3,
                },
            },
            pawn4: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 4,
                },
            },
            pawn5: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 5,
                },
            },
            pawn6: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 6,
                },
            },
            pawn7: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 7,
                },
            },
            pawn8: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 8,
                },
            },
        },
    },
    isWhiteMove: true,
    movesHistory: {
        movesCount: 0,
        moves: {},
    },
    lastMove: {} as Move,
}
const chessSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        updatePieces(state, action: PayloadAction<MakeMovePayload>) {
            const { color, piece, newPosition } = action.payload
            const pieceMoving = state.pieces[color][piece]

            pieceMoving.square = newPosition
            if (pieceMoving.isOnStartingPosition)
                pieceMoving.isOnStartingPosition = false
            state.isWhiteMove = !state.isWhiteMove //mb to thunk
        },
        updateHistory(state, action: PayloadAction<MakeMovePayload>) {
            const { color, piece, newPosition, isCheck } = action.payload
            const { type, square } = state.pieces[color][piece]

            // if black move, we got full move, need to update general history
            if (!state.isWhiteMove) {
                const history = state.movesHistory

                history.movesCount += 1
                history.moves[history.movesCount] = {
                    white: state.lastMove,
                    black: {
                        piece,
                        type: type,
                        previousPosition: square as Square,
                        newPosition,
                        isCheck,
                    },
                }
            }

            // update lastMove
            state.lastMove = {
                piece,
                type: type,
                previousPosition: square as Square,
                newPosition,
                isCheck,
            }
        },
    },
})

export const { updatePieces, updateHistory } = chessSlice.actions
export default chessSlice.reducer

// TC

const createThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
}>()

export const makeMove = createThunk(
    'chess/makeMove',
    (payload: MakeMovePayload, { dispatch }) => {
        dispatch(updateHistory(payload))
        dispatch(updatePieces(payload))
    }
)

// todo: HOW TO TYPECHECK THIS? createasyncthunk typescript

// types

export interface ChessState {
    pieces: {
        white: Pieces
        black: Pieces
    }
    isWhiteMove: boolean
    movesHistory: MovesHistory
    lastMove: Move
}

export interface Pieces {
    rook1: Piece
    knight1: Piece
    bishop1: Piece
    queen: Piece
    king: Piece
    bishop2: Piece
    knight2: Piece
    rook2: Piece
    pawn1: Piece
    pawn2: Piece
    pawn3: Piece
    pawn4: Piece
    pawn5: Piece
    pawn6: Piece
    pawn7: Piece
    pawn8: Piece
}

export interface Piece {
    type: PieceType
    square: Square | null
    isTaken?: boolean
    isOnStartingPosition?: boolean // to check if piece can do special move(castling, pawn firsh move)
    wasActiveLastMove?: boolean // exclusively for pawns to check for enPassant
}

export interface Square {
    y: SquareNum
    x: SquareNum
}

export interface MovesHistory {
    movesCount: number
    moves: {
        [key: number]: {
            white: Move
            black: Move
        }
    }
}

export interface Move {
    piece: keyof Pieces
    type: PieceType
    previousPosition: Square
    newPosition: Square
    isCheck: boolean
}

export type PieceType = 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn'
export type SquareNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type PieceColor = 'white' | 'black'

// actions

export interface MakeMovePayload {
    color: PieceColor
    piece: keyof Pieces
    newPosition: Square
    isCheck: boolean
    //todo: isTake?
}

export interface SetActiveHexesAction {
    hexes: Square[]
}
