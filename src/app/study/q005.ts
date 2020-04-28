import { IQuestion, TestConsole, Question, TestFile, FileData } from '../study.service';

/**
 * 作業時間管理クラス
 * 自由に修正してかまいません
 */
class WorkData {
    /** 社員番号 */
    private employeeNumber: string;

    /** 部署 */
    private department: string;

    /** 役職 */
    private position: string;

    /** Pコード */
    private pCode: string;

    /** 作業時間(分) */
    private workTime: number;

    public get getEmployeeNumber(): string {
        return this.employeeNumber;
    }

    public get getPosition(): string {
        return this.position;
    }

    public get getPCode(): string{
        return this.pCode;
    }

    public get getWorkTime(): number {
        return this.workTime;
    }

    constructor(arr: Array<string>) {
        [this.employeeNumber, this.department, this.position, this.pCode] = arr;
        this.workTime = Number.parseInt(arr[4]);
    }
}

/**
 * Q005 データクラスと様々な集計
 *
 * 以下のファイルを読み込んで、WorkDataクラスのインスタンスを作成してください。
 * assets/q005.txt
 * (先頭行はタイトルなので読み取りをスキップする)
 *
 * 読み込んだデータを以下で集計して出力してください。
 * (1) 役職別の合計作業時間
 * (2) Pコード別の合計作業時間
 * (3) 社員番号別の合計作業時間
 * 上記項目内での出力順は問いません。
 *
 * 作業時間は "xx時間xx分" の形式にしてください。
 * また、WorkDataクラスは自由に修正してください。
 *
[出力イメージ]
部長: xx時間xx分
課長: xx時間xx分
一般: xx時間xx分
Z-7-31100: xx時間xx分
I-7-31100: xx時間xx分
T-7-30002: xx時間xx分
（省略）
194033: xx時間xx分
195052: xx時間xx分
195066: xx時間xx分
（省略）
 */
@Question("様々なフィールドで集計")
export class Q005 implements IQuestion {
    /**
     * コンストラクタ
     * 実行時に自動生成される際、testConsoleが渡されてくる
     * @param testConsole コンソール操作用のオブジェクト
     */
    constructor(private testConsole: TestConsole) {}

    @TestFile("q005.txt")
    private fileData: FileData;

    async main() {
        const fileDataContent: Array<string> = this.fileData.content.split("\n");
        fileDataContent.shift();
        const workDataList: Array<WorkData> = fileDataContent.map(str => new WorkData(str.split(",")));

        const sumWorkTimeByPos: Map<string, number> = new Map();
        const sumWorkTimeByPCode: Map<string, number> = new Map();
        const sumWorkTimeByEmpNum: Map<string, number> = new Map();
        workDataList.forEach(workData => {
            const workTime = workData.getWorkTime;
            // 役職別
            const position = workData.getPosition;
            sumWorkTimeByPos.set(position, sumWorkTimeByPos.has(position) ? sumWorkTimeByPos.get(position) + workTime : workTime);

            // P_CODE別
            const pCode = workData.getPCode;
            sumWorkTimeByPCode.set(pCode, sumWorkTimeByPCode.has(pCode) ? sumWorkTimeByPCode.get(pCode) + workTime : workTime);

            // 社員番号別
            const empNum = workData.getEmployeeNumber;
            sumWorkTimeByEmpNum.set(empNum, sumWorkTimeByEmpNum.has(empNum) ? sumWorkTimeByEmpNum.get(empNum) + workTime : workTime);
        });
        // TestConsoleを使って出力してください
        const workTimeStr = (workTime: number): string => {
            return `${Math.floor(workTime/60)}時間${workTime%60}分`;
        }
        [sumWorkTimeByPos, sumWorkTimeByPCode, sumWorkTimeByEmpNum].forEach(map => map.forEach((value, key) => this.testConsole.println(`${key}: ${workTimeStr(value)}`)));
    }
}
// 完成までの時間: 3時間 00分