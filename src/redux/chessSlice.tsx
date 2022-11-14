import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ChessState = {
    pieces: {
        white: {
            rook1: {
                type: "rook",
                square: {
                    y: 1,
                    x: 1
                }

            },
            knight1: {
                type: "knight",
                square: {
                    y: 1,
                    x: 2
                }
            },
            bishop1: {
                type: "bishop",
                square: {
                    y: 1,
                    x: 3
                }
            },
            queen: {
                type: "queen",
                square: {
                    y: 1,
                    x: 4
                }
            },
            king: {
                type: "king",
                square: {
                    y: 1,
                    x: 5
                }
            },
            bishop2: {
                type: "bishop",
                square: {
                    y: 1,
                    x: 6
                }
            },
            knight2: {
                type: "knight",
                square: {
                    y: 1,
                    x: 7
                }
            },
            rook2: {
                type: "rook",
                square: {
                    y: 1,
                    x: 8
                }
            },
            pawn1: {
                type: "pawn",
                square: {
                    y: 2,
                    x: 1
                }
            },
            pawn2: {
                type: "pawn",
                square: {
                    y: 2,
                    x: 2
                }
            },
            pawn3: {
                type: "pawn",
                square: {
                    y: 2,
                    x: 3
                }
            },
            pawn4: {
                type: "pawn"
                ,
                square: {
                    y: 2,
                    x: 4
                }
            },
            pawn5: {
                type: "pawn",
                square: {
                    y: 2,
                    x: 5
                }
            },
            pawn6: {
                type: "pawn",
                square: {
                    y: 2,
                    x: 6
                }
            },
            pawn7: {
                type: "pawn",
                square: {
                    y: 6,
                    x: 7
                }
            },
            pawn8: {
                type: "pawn",
                square: {
                    y: 2,
                    x: 8
                }
            }
        },
        black: {
            rook1: {
                type: "rook",
                square: {
                    y: 8,
                    x: 1
                }

            },
            knight1: {
                type: "knight",
                square: {
                    y: 8,
                    x: 2
                }
            },
            bishop1: {
                type: "bishop",
                square: {
                    y: 8,
                    x: 3
                }
            },
            queen: {
                type: "queen",
                square: {
                    y: 8,
                    x: 4
                }
            },
            king: {
                type: "king",
                square: {
                    y: 8,
                    x: 5
                }
            },
            bishop2: {
                type: "bishop",
                square: {
                    y: 8,
                    x: 6
                }
            },
            knight2: {
                type: "knight",
                square: {
                    y: 8,
                    x: 7
                }
            },
            rook2: {
                type: "rook",
                square: {
                    y: 8,
                    x: 8
                }
            },
            pawn1: {
                type: "pawn",
                square: {
                    y: 7,
                    x: 1
                }
            },
            pawn2: {
                type: "pawn",
                square: {
                    y: 7,
                    x: 2
                }
            },
            pawn3: {
                type: "pawn",
                square: {
                    y: 7,
                    x: 3
                }
            },
            pawn4: {
                type: "pawn"
                ,
                square: {
                    y: 7,
                    x: 4
                }
            },
            pawn5: {
                type: "pawn",
                square: {
                    y: 7,
                    x: 5
                }
            },
            pawn6: {
                type: "pawn",
                square: {
                    y: 7,
                    x: 6
                }
            },
            pawn7: {
                type: "pawn",
                square: {
                    y: 7,
                    x: 7
                }
            },
            pawn8: {
                type: "pawn",
                square: {
                    y: 7,
                    x: 8
                }
            }
        },
    },
}

const chessSlice = createSlice({
    name: "chess",
    initialState,
    reducers: {
        makeMove(state, action: PayloadAction<MakeMoveAction>) {
            let p = action.payload;
            state.pieces[p.color][p.piece].square = p.newPosition
        }
    }
})

export const { makeMove } = chessSlice.actions
export default chessSlice.reducer

// TC

// types

export interface ChessState {
    pieces: {
        white: Pieces,
        black: Pieces
    }
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
    type: PieceType,
    square: Square | null
    isTaken?: boolean
}

export interface Square {
    y: SquareNum
    x: SquareNum
}

export type PieceType = "rook" | "knight" | "bishop" | "queen" | "king" | "pawn"
export type SquareNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type PieceColor = "white" | "black"

// actions

export interface MakeMoveAction {
    piece: keyof Pieces,
    color: PieceColor,
    newPosition: Square
}

export interface SetActiveHexesAction {
    hexes: Square[]
}