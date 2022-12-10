// 問題取得

export interface IGetQuestionsInput {
	n: number; 
}

export interface IGetQuestionsOutput {
	code: string;
	tips: string;
    language: string;
}
