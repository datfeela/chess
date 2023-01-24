import { AppDispatch, RootState } from './store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PieceMoveEffect } from '../func/chess/chessHelpersTypes'

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
                isOnStartingPosition: true,
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
                isOnStartingPosition: true,
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
                isOnStartingPosition: true,
            },
            pawn1: {
                type: 'pawn',
                // square: {
                //     y: 7,
                //     x: 1,
                // },
                square: null,
                isOnStartingPosition: true,
            },
            pawn2: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 2,
                },
                isOnStartingPosition: true,
            },
            pawn3: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 3,
                },
                isOnStartingPosition: true,
            },
            pawn4: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 4,
                },
                isOnStartingPosition: true,
            },
            pawn5: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 5,
                },
                isOnStartingPosition: true,
            },
            pawn6: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 6,
                },
                isOnStartingPosition: true,
            },
            pawn7: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 7,
                },
                isOnStartingPosition: true,
            },
            pawn8: {
                type: 'pawn',
                square: {
                    y: 7,
                    x: 8,
                },
                isOnStartingPosition: true,
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
            const { color, piece, newPosition, effect } = action.payload
            const pieceMoving = state.pieces[color][piece]

            pieceMoving.square = newPosition
            if (pieceMoving.isOnStartingPosition)
                pieceMoving.isOnStartingPosition = false

            if (piece === 'king' && effect) {
                if (effect === 'castlingLeft') {
                    state.pieces[color].rook1 = {
                        ...state.pieces[color].rook1,
                        isOnStartingPosition: false,
                        square: { x: 4, y: newPosition.y },
                    }
                }

                if (effect === 'castlingRight') {
                    state.pieces[color].rook2 = {
                        ...state.pieces[color].rook2,
                        isOnStartingPosition: false,
                        square: { x: 6, y: newPosition.y },
                    }
                }
            }
            state.isWhiteMove = !state.isWhiteMove //mb to thunk
        },
        updateHistory(state, action: PayloadAction<MakeMovePayload>) {
            const { color, piece, newPosition, isCheck, effect } =
                action.payload
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
                effect,
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

export type Pieces = {
    [key in PieceName]: Piece
}

export interface Piece {
    type: PieceType
    square: Square | null //null if piece is taken
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
    effect?: PieceMoveEffect
}

export type PieceName =
    | 'rook1'
    | 'knight1'
    | 'bishop1'
    | 'queen'
    | 'king'
    | 'bishop2'
    | 'knight2'
    | 'rook2'
    | 'pawn1'
    | 'pawn2'
    | 'pawn3'
    | 'pawn4'
    | 'pawn5'
    | 'pawn6'
    | 'pawn7'
    | 'pawn8'
export type PieceType = 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn'
export type SquareNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type PieceColor = 'white' | 'black'

// actions

export interface MakeMovePayload {
    color: PieceColor
    piece: keyof Pieces
    newPosition: Square
    isCheck: boolean
    effect?: PieceMoveEffect
    //todo: isTake?
}

export interface SetActiveHexesAction {
    hexes: Square[]
}
