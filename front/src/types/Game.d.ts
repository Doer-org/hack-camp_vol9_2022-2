export type GameMode =  {
    questionMode : 'OneLinear' 
    playMode : 'Single' | 'Multi'
} 

export type Question = { 
    codes : string  
    tips : string
    language : string
}

export type Score = { 
    total_types : number
    wrong_types : number
}

  
export type KeyLog = {
    status : 'typo' | 'incorrect' | 'correct' | 'waiting'
    key : string
}
     
export type GameState = {
    lastKeyInput : string
    questions : Question[]
    record : KeyLog[][]
    Q_n : number
    input_n : number
    typo : boolean
    finished : boolean
}