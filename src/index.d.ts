interface BotOptions {
    respondToBots?: boolean
}

export class Bot {
    constructor(options: BotOptions); 
}

export enum Types {
    TEXT,
    
}