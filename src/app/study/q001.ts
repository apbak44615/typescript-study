import { IQuestion, TestConsole, Question } from '../study.service';

/**
 * Q001 コンストラクタの修正
 * 
 * コンストラクタが正しく定義されていません。
 * 正しいコンストラクタに修正して、main()内部のコメントを外してください
 */
@Question("コンストラクタを正しく修正する")
export class Q001 implements IQuestion {
    /**
     * コンストラクタ
     * 実行時に自動生成される際、testConsoleが渡されてくる
     * @param testConsole コンソール操作用のオブジェクト
     */
    constructor(private testConsole: TestConsole) { }

    async main() {
        // コンストラクタを正しく修正したら、以下のコメントを外してください
        this.testConsole.println('Hello World.');
    }
}
// 完成までの時間: 2分
