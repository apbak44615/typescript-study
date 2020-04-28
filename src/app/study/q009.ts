import { IQuestion, TestConsole, Question } from '../study.service';

// 別スレッド（Worker）として動かすファイル（下記ファイルも実装してください）
const WORKER_FILE = "assets/q009.worker.js";

/**
 * Q009 重い処理を別スレッドで実行
 *
 * 標準入力から整数を受け取り、別スレッドで素因数分解して、その整数を構成する2以上の素数を求めるプログラムを記述してください。
 * - 素因数分解は重い処理であるため、別スレッドで実行してください
 * - 標準入力から整数を受け取った後は、再度標準入力に戻ります
 * - 空文字が入力された場合は、素因数分解を実行中の状態を表示します（「実行中」あるいは処理結果を表示）
 * - 素因数分解の効率的なアルゴリズムを求めるのが問題ではないため、あえて単純なアルゴリズムで良い（遅いほどよい）
 *   （例えば、2および3以上の奇数で割り切れるかを全部チェックする方法でも良い）
 * - bigIntを使って、大きな数値も扱えるようにしてください
 *     https://www.npmjs.com/package/big-integer
 * - 別スレッドの処理は "assets/q009.worker.js" に記述します
 * - 終了時にはWorkerのterminateを忘れないようにしてください

[実行イメージ]
入力) 65536
入力)
65536: 実行中  <-- もし65536の素因数分解が実行中だった場合はこのように表示する
入力) 12345
入力)
65536: 2      <-- 実行が終わっていたら結果を表示する。2の16乗だが、16乗の部分の表示は不要（複数溜まっていた場合の順番は問わない）
12345: 実行中
入力)
12345: 3,5,823
 */
@Question("重い処理を別スレッドで実行する")
export class Q009 implements IQuestion {

    private readonly RESULTS_EXECUTING = "実行中";

    constructor(private testConsole: TestConsole) {
    }

    async main() {
        // TestConsoleを使って出力してください
        let workerIndex = 0;
        const workers = {};
        const results = {};
        while (true) {
            this.testConsole.print("> ");
            let line = await this.testConsole.readLine();
            if (line == "exit" || line == "quit") {
                break;
            }
            if (line == "") {
                // 処理結果を表示
                Object.keys(results).forEach(key => {
                    const resultsString = String(results[key]);
                    this.testConsole.println(resultsString);
                    if (!((resultsString.lastIndexOf(this.RESULTS_EXECUTING) + this.RESULTS_EXECUTING.length
                        === resultsString.length) &&
                        this.RESULTS_EXECUTING.length <= resultsString.length)
                    ) {
                        delete results[key];
                    }
                });

            } else {
                // スレッド生成し計算開始
                const worker = new Worker(WORKER_FILE);
                workers[workerIndex] = worker;
                results[workerIndex] = line + ": " + this.RESULTS_EXECUTING;
                worker.postMessage([workerIndex, line]);
                worker.onmessage = e => {
                    // 計算結果を受け取りスレッド削除
                    const workerIndex = e.data[0];
                    const primaryNumbers = e.data[1];
                    results[workerIndex] = line + ": " + primaryNumbers.reduce((result, current) => {
                        return result + "," + current.toString();
                    })
                    workers[workerIndex].terminate();
                    delete workers[workerIndex];
                }
                workerIndex++;
            }
        }
    }
}

// 完成までの時間: 4時間 00分
