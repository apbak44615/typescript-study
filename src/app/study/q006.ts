import { IQuestion, TestConsole, Question } from '../study.service';

/**
 * 値のインタフェース
 */
interface IValue {
    /**
     * 計算を実行する
     * @param stack 値の保存されたスタック
     */
    execute(stack: number[]): void;
}

/**
 * 数値を保持するクラス
 */
class DecimalValue implements IValue {
    /** 保持する値 */
    private value: number;

    constructor(text: string) {
        this.value = Number(text);
        if (isNaN(this.value)) {
            throw "数値ではない:" + text;
        }
    }

    public execute(stack: number[]): void {
        // スタックに値を積む
        stack.push(this.value);
    }
}

/**
 * 足し算を行うクラス
 */
class PlusValue implements IValue {
    public execute(stack: number[]): void {
        // スタックに値を積む
        let right = stack.pop();
        let left = stack.pop();
        stack.push(left + right);
    }
}

/**
 * 引き算を行うクラス
 */
class MinusValue implements IValue {
    public execute(stack: number[]): void {
        // スタックに値を積む
        let right = stack.pop();
        let left = stack.pop();
        stack.push(left - right);
    }
}

/**
 * 掛け算を行うクラス
 */
class MultiplicationValue implements IValue {
    public execute(stack: number[]): void {
        // スタックに値を積む
        let right = stack.pop();
        let left = stack.pop();
        stack.push(left * right);
    }
}

/**
 * 割り算を行うクラス
 */
class DivisionValue implements IValue {
    public execute(stack: number[]): void {
        // スタックに値を積む
        let right = stack.pop();
        let left = stack.pop();
        stack.push(left / right);
    }
}

/**
 * Q006 空気を読んで改修
 *
 * 標準入力から「逆ポーランド記法」で記載された1行の入力を受け取り、その計算結果を出力する処理を実装してください。
 * 実装するのは四則演算（+ - * /）です。
 *
 * https://ja.wikipedia.org/wiki/%E9%80%86%E3%83%9D%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89%E8%A8%98%E6%B3%95
 *
 * ただし、現状は以下の実装が終わっています。
 * - 逆ポーランド記法を分解して、計算しやすい値リストに変換する処理の一部（Q006.parseLine）
 * - 計算しやすい値として管理するためのクラス群の一部（IValue,DecimalValue,PlusValue）
 *
 * 途中まで終わっている実装を上手く流用しながら、残りの処理を実装してください。
 * エラー入力のチェックは不要です。
 *
 * 実行例：
 *
 * 入力） 3 1.1 0.9 + 2.0 * -
 * 出力） -1
 * （または -1.00 など、小数点に0がついてもよい）
 */
@Question("空気を読んで計算機を改修")
export class Q006 implements IQuestion {
    constructor(private testConsole: TestConsole) {
    }

    /**
     * 逆ポーランドで記載された1行のテキストを分解する
     * @param lineText 1行テキスト
     */
    private parseLine(lineText: string): IValue[] {
        let resultList: IValue[] = [];
        for (let text of lineText.split(/[\s]+/g)) {
            switch (text) {
                case '+':   // 足し算
                    resultList.push(new PlusValue());
                    break;
                case '-':   // 引き算
                    resultList.push(new MinusValue());
                    break;
                case '*':   // 掛け算
                    resultList.push(new MultiplicationValue());
                    break;
                case '/':   // 割り算
                    resultList.push(new DivisionValue());
                    break;
                default:    // その他は数値として扱う
                    resultList.push(new DecimalValue(text));
                    break;
            }
        }
        return resultList;
    }

    async main() {
        while (true) {
            this.testConsole.print("> ");
            let line = await this.testConsole.readLine();
            if (line == "exit" || line == "quit") {
                break;
            }
            let values = this.parseLine(line);
            const stack: number[] = [];
            values.forEach(value => value.execute(stack));
            this.testConsole.println(`${stack[0]}`);
        }
    }
}
// 完成までの時間: 3時間 0分